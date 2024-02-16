import React, { useState, useImperativeHandle, forwardRef, Ref, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Modal, Transfer, message } from 'antd'
import {
  reqSortList,
  reqDeleteAllByBookId,
  reqBindBookSort,
  reqSearchSortByBookId
} from '@/service/modules/sort'
interface IProps {
  children?: ReactNode
}
interface IChildMethods {
  openModal: (val: any) => void
}
const BindSortDialog: React.ForwardRefRenderFunction<IChildMethods, IProps> = (props, ref) => {
  useEffect(() => {
    getSortList()
  }, [])
  async function getSortList() {
    const { data } = await reqSortList()
    setSortList(data)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortList, setSortList] = useState<[]>()
  const [targetKeys, setTargetKeys] = useState<[]>()
  const [curBookId, setCurBookId] = useState()
  async function openModal(record: any) {
    const res = await reqSearchSortByBookId(record.id)
    const sortKeys = res.data?.map((item: any) => item.sortId)
    setTargetKeys(sortKeys)
    setCurBookId(record.id)
    setIsModalOpen(true)
  }
  function handleTransferChange(target: any) {
    // console.log(curBookId, target)
    setTargetKeys(target)
  }
  async function handleOk() {
    try {
      const { code } = await reqDeleteAllByBookId(curBookId!)
      if (code !== 201) return message.warning('无权限')
      const asyncArr = []
      for (const item of targetKeys!) {
        asyncArr.push(reqBindBookSort(item, curBookId!))
      }
      await Promise.all(asyncArr)
      message.success('绑定成功')
    } catch (error) {
      console.log('Catch block:', error)
      message.warning('绑定失败请重试')
    }
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref as Ref<IChildMethods>, () => ({
    openModal
  }))
  return (
    <Modal title="绑定书籍类型" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Transfer
        dataSource={sortList}
        titles={['类型', '已选类型']}
        rowKey={(item) => item.id}
        targetKeys={targetKeys}
        // selectedKeys={selectedKeys}
        onChange={handleTransferChange}
        // onSelectChange={onSelectChange}
        // onScroll={onScroll}
        render={(item: any) => item.name}
        style={{ justifyContent: 'center' }}
      />
    </Modal>
  )
}

BindSortDialog.displayName = 'BindSortDialog'
export default forwardRef(BindSortDialog)
