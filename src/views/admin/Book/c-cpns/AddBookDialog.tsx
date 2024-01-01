import React, { forwardRef, useState, useImperativeHandle, Ref } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Form, Input, message, Row, Col } from 'antd'
import UploadImg from '@/components/uploadImg'
import { addBook } from '@/service/modules/book'
interface IProps {
  children?: ReactNode
  ref?: any
  reloadBookList: () => void
}
interface IChildMethods {
  openModal: (val: any) => void
}
const { TextArea } = Input
const AddBookDialog: React.ForwardRefRenderFunction<IChildMethods, IProps> = (props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addForm] = Form.useForm()
  async function openModal() {
    setIsModalOpen(true)
  }
  function getImgFile(file: any) {
    addForm.setFieldValue('album', file)
  }
  async function handleOk() {
    try {
      await addForm.validateFields()
    } catch (error) {
      return message.warning('表单不能为空')
    }
    const info = addForm.getFieldsValue()
    try {
      const { code } = await addBook(info)
      if (code !== 201) return message.warning('新增失败,请重试')
      message.success('新增书籍成功')
      props.reloadBookList()
      addForm.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      message.warning('新增失败,请重试')
    }
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref as Ref<IChildMethods>, () => ({
    openModal
  }))
  return (
    <Modal
      title="添加书籍"
      width={900}
      getContainer={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="AddBookForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={addForm}
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
            <Form.Item
              label="封面"
              name="album"
              rules={[{ required: true, message: '请选择图片' }]}
            >
              <UploadImg getImgFile={getImgFile}></UploadImg>
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

AddBookDialog.displayName = 'AddBookDialog'
export default forwardRef(AddBookDialog)
