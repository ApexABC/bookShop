import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Form, Input, Button, Switch, Cascader, message } from 'antd'
import areaList from '@/assets/data/ares.json'
import { reqAddAddress, reqEditAddress } from '@/service/modules/order'
import { useLocation, useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const AddressInfo: FC<IProps> = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [curStatus, setCurStatus] = useState('add') // 当前状态 add新增 edit编辑
  useEffect(() => {
    console.log('addressInfo', location)

    if (location.state.addressInfo) {
      const { addressInfo } = location.state
      setCurStatus('edit')
      addressForm.setFieldsValue(addressInfo)
      addressForm.setFieldValue('district', [
        addressInfo.province,
        addressInfo.city,
        addressInfo.district
      ])
    }
  }, [])
  const [addressForm] = Form.useForm()
  async function onFinish(val: any) {
    if (curStatus === 'add') {
      const info = {
        ...val,
        province: val.district[0],
        city: val.district[1],
        district: val.district[2],
        isDefault: val.isDefault ? 1 : 0
      }
      const { code } = await reqAddAddress(info)
      if (code === 201) message.success('添加收货地址成功')
      if (location.state.selectAddress) navigate(-2)
    } else if (curStatus === 'edit') {
      const info = {
        ...val,
        id: location.state.addressInfo.id,
        province: val.district[0],
        city: val.district[1],
        district: val.district[2],
        isDefault: val.isDefault ? 1 : 0
      }
      const { code } = await reqEditAddress(info)
      if (code === 201) message.success('编辑收货地址成功')
    }
    navigate('/shop/addressList')
  }
  return (
    <div className="flex justify-center pt-10 px-4">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        style={{ margin: '0 auto', width: '100%' }}
        onFinish={onFinish}
        form={addressForm}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="收件人"
          name="name"
          rules={[{ required: true, message: '请输入收件人姓名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入收件人电话!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="省市区"
          name="district"
          rules={[{ required: true, message: '请输入收件人所在区域!' }]}
        >
          <Cascader
            options={areaList}
            fieldNames={{ label: 'name', value: 'name', children: 'children' }}
          />
        </Form.Item>

        <Form.Item
          label="详情地址"
          name="address"
          rules={[{ required: true, message: '请输入收件人详情地址!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="默认地址" name="isDefault" initialValue={true}>
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

AddressInfo.displayName = 'AddressInfo'
export default memo(AddressInfo)
