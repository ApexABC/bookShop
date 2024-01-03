import React, { memo, useEffect, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
// import { useAppSelector, useAppDispatch, shallowEqualApp } from '@/store'
import { BookWrapper } from './style'
// import { fetchAdminBookAction } from '@/store/modules/adminBook'
import { Table, Image, Button, Popconfirm, message, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { IBookData } from '@/type'
import EditBookDialog from './c-cpns/EditBookDialog'
import { deleteBook } from '@/service/modules/book'
import AddBookDialog from './c-cpns/addBookDialog'
import { searchBook, reqBookList } from '@/service/modules/book'
interface IProps {
  children?: ReactNode
}
const { Search } = Input
const Book: FC<IProps> = (props) => {
  // const dispatch = useAppDispatch()
  // const { bookInfo } = useAppSelector(
  //   (state) => ({
  //     bookInfo: state.adminBook.bookInfo
  //   }),
  //   shallowEqualApp
  // )
  useEffect(() => {
    // await dispatch(fetchAdminBookAction({ limit: 1000, offset: 0 }))
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
    console.log(data)

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
          // scroll={{ y: '67vh' }}
          pagination={{
            total: curBook?.count,
            showTotal: (total) => `共 ${total} 条`,
            defaultPageSize: 10,
            defaultCurrent: 1
          }}
          // style={{ height: 500 }}
        ></Table>
      </div>
      <EditBookDialog ref={editDialogRef} reloadBookList={reloadBookList} />
      <AddBookDialog ref={addDialogRef} reloadBookList={reloadBookList} />
    </BookWrapper>
  )
}

Book.displayName = 'Book'
export default memo(Book)
