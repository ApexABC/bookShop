import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Table, Popconfirm, Modal, Input, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { reqAddSort, reqDeleteSort, reqEditSort, reqSortList } from '@/service/modules/sort'
interface IProps {
  children?: ReactNode
}

const AdminSort: FC<IProps> = (props) => {
  useEffect(() => {
    getSortList()
  }, [])
  const [curSource, setCurSource] = useState<[]>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dialogState, setDialogState] = useState<string>()
  const [inputVal, setInputVal] = useState<string>()
  const [editId, setEditId] = useState<number>()
  const columns: ColumnsType<any> = [
    { title: '榜单名称', dataIndex: 'name', key: 'name', width: 700 },
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
  function handleAddBtn() {
    setInputVal('')
    setDialogState('add')
    setIsModalOpen(true)
  }
  async function handleEditBtn(text: any, record: any) {
    setDialogState(`edit`)
    setInputVal(record.name)
    setEditId(record.id)
    setIsModalOpen(true)
  }
  async function handleDeleteBtn(text: any, record: any) {
    const { code } = await reqDeleteSort(record.id)
    if (code !== 201) return message.warning('删除失败，请重试')
    message.success('删除成功')
    getSortList()
  }
  async function handleOk() {
    try {
      if (dialogState === 'add') {
        const { code } = await reqAddSort(inputVal!)
        if (code !== 201) return message.warning('添加失败，请重试')
        message.success('添加成功')
      } else if (dialogState === 'edit') {
        const { code } = await reqEditSort(editId as number, inputVal!)
        if (code !== 201) return message.warning('编辑失败，请重试')
        message.success('编辑成功')
      }
      getSortList()
    } catch (error) {
      message.warning('编辑失败，请重试')
    }
    setInputVal('')
    setIsModalOpen(false)
  }
  async function getSortList() {
    const res = await reqSortList()
    setCurSource(res.data)
  }
  return (
    <div>
      <header className="mb-4">
        <Button type="primary" onClick={handleAddBtn}>
          新增
        </Button>
      </header>
      <main>
        <Table
          columns={columns}
          rowKey={(item) => item.id}
          dataSource={curSource}
          pagination={{
            total: curSource?.length,
            showTotal: (total) => `共 ${total} 条`,
            defaultPageSize: 10,
            defaultCurrent: 1
          }}
          style={{ height: '100%' }}
        ></Table>
      </main>
      <Modal
        title={dialogState === 'add' ? '添加种类' : '编辑种类'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={(e) => setIsModalOpen(false)}
      >
        <div className="flex items-center justify-between">
          <span className="">{dialogState === 'add' ? '添加种类' : '编辑种类'}</span>
          <Input
            className="w-10/12"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="请输入种类"
          />
        </div>
      </Modal>
    </div>
  )
}

AdminSort.displayName = 'AdminSort'
export default memo(AdminSort)
