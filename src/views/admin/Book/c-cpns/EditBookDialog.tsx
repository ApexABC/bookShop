import React, { useState, useImperativeHandle, Ref, forwardRef, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Form, Input, message, Row, Col } from 'antd'
import UploadImg from '@/components/uploadImg'
import { getImageFileFromUrl } from '@/utils/urlToFile'
import { updataBook } from '@/service/modules/book'
interface IProps {
  children?: ReactNode
  ref?: any
  reloadBookList: () => void
}
interface IChildMethods {
  openModal: (val: any) => void
}
const { TextArea } = Input
const EditBookDialog: React.ForwardRefRenderFunction<IChildMethods, IProps> = (props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editFormInfo, setEditFormInfo] = useState<any>()
  const [editForm] = Form.useForm()
  const uploadImgRef = useRef<{ setImageUrl: (img: string) => void } | null>(null)
  useEffect(() => {
    uploadImgRef.current?.setImageUrl(editForm.getFieldValue('album'))
  }, [editFormInfo])
  async function openModal(info: any) {
    setIsModalOpen(true)
    editForm.setFieldsValue(info)
    const newInfo = info
    const file = await getImageFileFromUrl(info.album, info.name)
    newInfo.album = file
    setEditFormInfo(newInfo)
  }
  function getImgFile(file: any) {
    const newInfo = { ...editFormInfo }
    newInfo.album = file
    setEditFormInfo(newInfo)
  }
  async function handleEditOk() {
    try {
      await editForm.validateFields()
    } catch (error) {
      return message.warning('表单不能为空')
    }
    const info = editForm.getFieldsValue(true)
    delete info.album
    Object.assign(editFormInfo, info)
    try {
      const { code } = await updataBook(editFormInfo)
      if (code !== 201) return message.success('更新书籍失败，请重试')
      setIsModalOpen(false)
      props.reloadBookList()
      message.success('更新书籍成功')
    } catch (error) {
      message.success('更新书籍失败，请重试')
    }
  }
  function handleEditCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref as Ref<IChildMethods>, () => ({
    openModal
  }))
  return (
    <Modal
      title="修改书籍"
      width={900}
      getContainer={false}
      open={isModalOpen}
      onOk={handleEditOk}
      onCancel={handleEditCancel}
    >
      <Form
        name="editBookForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={editForm}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={11}>
            <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={11}>
            <Form.Item
              label="发行商"
              name="publisher"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="发布时间"
              name="pubtime"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={11}>
            <Form.Item label="评分" name="rate" rules={[{ required: true, message: '请输入' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="价格" name="price" rules={[{ required: true, message: '请输入' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={11}>
            <Form.Item label="封面" rules={[{ required: true }]}>
              <UploadImg ref={uploadImgRef} getImgFile={getImgFile}></UploadImg>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="描述" name="describe" rules={[{ required: true, message: '请输入' }]}>
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

EditBookDialog.displayName = 'EditBookDialog'
export default forwardRef(EditBookDialog)
