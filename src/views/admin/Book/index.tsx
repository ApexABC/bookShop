import { memo, useEffect, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { BookWrapper } from './style'
import { Table, Image, Button, Popconfirm, message, Input, InputNumber } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { IBookData } from '@/type'
import EditBookDialog from './c-cpns/EditBookDialog'
import { deleteBook, reqChangeBookInventory } from '@/service/modules/book'
import AddBookDialog from './c-cpns/addBookDialog'
import { searchBook, reqBookList } from '@/service/modules/book'
import BindSortDialog from './c-cpns/bindSortDialog'
interface IProps {
  children?: ReactNode
}
const { Search } = Input
const Book: FC<IProps> = (props) => {
  useEffect(() => {
    reloadBookList()
  }, [])
  const columns: ColumnsType<IBookData> = [
    { title: '书籍名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '作者', dataIndex: 'author', key: 'author', width: 100 },
    {
      title: '封面',
      dataIndex: 'album',
      key: 'album',
      width: 100,
      render: (info) => <Image width={80} src={info} />
    },
    { title: '发布时间', dataIndex: 'pubtime', key: 'pubtime', width: 150 },
    { title: '评分', dataIndex: 'rate', key: 'rate', width: 80 },
    { title: '价格', dataIndex: 'price', key: 'price', width: 80 },
    { title: '发行商', dataIndex: 'publisher', key: 'publisher', width: 100 },
    { title: '描述', dataIndex: 'describe', key: 'describe', ellipsis: true },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
      width: 110,
      render: (text, record) => {
        return (
          <InputNumber
            min={0}
            max={1000}
            defaultValue={text}
            onChange={(e) => handleInventoryChange(e, record)}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: 200,
      render: (text, record) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEditBtn(text, record)}>
              编辑
            </Button>
            <Button type="link" onClick={() => handleBindSort(text, record)}>
              绑定书籍类型
            </Button>
            <Popconfirm
              title="删除书籍"
              description={`确认要删除${record.name}？`}
              onConfirm={() => handleDeleteBtn(text, record)}
              okText="确认删除"
              cancelText="取消"
            >
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const [curBook, setCurbook] = useState<any>()
  // 查找书籍
  async function handleSearchBtn(info: any) {
    const { data } = await searchBook(info)
    setCurbook(data)
  }
  // 编辑书籍弹窗
  const editDialogRef = useRef<{ openModal: (info: any) => void } | null>(null)
  function handleEditBtn(text: any, record: any) {
    editDialogRef.current?.openModal({ ...record })
  }
  // 增加书籍
  const addDialogRef = useRef<{ openModal: () => void } | null>(null)
  function handleAddBtn() {
    addDialogRef.current?.openModal()
  }
  // 绑定书籍类型
  const bindSortDialogRef = useRef<{ openModal: (info: any) => void } | null>(null)
  function handleBindSort(text: any, record: any) {
    bindSortDialogRef.current?.openModal(record)
  }
  async function handleDeleteBtn(_: any, record: any) {
    try {
      const { code } = await deleteBook(record.id)
      if (code !== 201) return message.warning('删除书籍失败，请重试')
      message.success('删除书籍成功')
      reloadBookList()
    } catch (error) {
      message.warning('删除书籍失败，请重试')
    }
  }
  async function handleInventoryChange(e: any, item: any) {
    if (e === null) return
    const info = {
      id: item.id,
      inventory: e
    }
    const { code } = await reqChangeBookInventory(info)
    if (code === 201) return message.success('修改库存成功')
    message.warning('修改库存失败')
  }
  async function reloadBookList() {
    const { data } = await reqBookList(1000, 0)
    setCurbook(data)
  }
  return (
    <BookWrapper>
      <div className="header">
        <Button type="primary" onClick={handleAddBtn}>
          新增
        </Button>
        <Search
          className="ml-5"
          style={{ width: 300 }}
          placeholder="查询书籍和作者"
          onSearch={handleSearchBtn}
          enterButton
        />
      </div>
      <div className="table">
        <Table
          columns={columns}
          dataSource={curBook?.bookList}
          rowKey={(item) => item.id}
          pagination={{
            total: curBook?.count,
            showTotal: (total) => `共 ${total} 条`,
            defaultPageSize: 10,
            defaultCurrent: 1
          }}
        ></Table>
      </div>
      <EditBookDialog ref={editDialogRef} reloadBookList={reloadBookList} />
      <AddBookDialog ref={addDialogRef} reloadBookList={reloadBookList} />
      <BindSortDialog ref={bindSortDialogRef}></BindSortDialog>
    </BookWrapper>
  )
}

Book.displayName = 'Book'
export default memo(Book)
