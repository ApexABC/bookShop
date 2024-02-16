import Svg from '@/components/Svg'
import { reqAddressList, reqDeleteAddress } from '@/service/modules/order'
import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, message } from 'antd'
interface IProps {
  children?: ReactNode
}
const { confirm } = Modal
const AddressList: FC<IProps> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSelectAddress, setIsSelectAddress] = useState(false)
  useEffect(() => {
    console.log('addressInfo', location)

    fetchAddressList()
    if (location?.state?.selectAddress) setIsSelectAddress(true)
  }, [])
  function handleDelete(e: any, item: any) {
    e.stopPropagation()
    confirm({
      title: '确认要删除该地址?',
      async onOk() {
        const res = await reqDeleteAddress(item.id)
        if (res.code === 201) message.success('删除成功')
        fetchAddressList()
      }
    })
  }
  const [curAddressList, setCurAddressList] = useState<any[]>()
  async function fetchAddressList() {
    const { addressList } = await reqAddressList()
    setCurAddressList(addressList)
  }
  function handleAddressItemClick(item: any) {
    if (isSelectAddress) {
      navigate('/shop/subOrder', {
        state: { selectedAddressInfo: item, checkedItemList: location.state?.checkedItemList }
      })
    }
  }
  return (
    <div className="h-full w-full p-5 pt-2">
      <h1 className="mb-2 text-2xl font-bold">我的收货地址</h1>
      <div
        onClick={(e) =>
          navigate('/shop/addressInfo', {
            state: { selectAddress: location.state?.selectAddress ? true : false }
          })
        }
        className="mx-auto my-3 text-center w-40 h-7 leading-7 rounded-2xl text-white cursor-pointer hover:bg-orange-400 bg-orange-500"
      >
        添加收货地址
      </div>
      {curAddressList?.length === 0 ? (
        <div className="text-center">您还没有收货地址，请添加收货地址！</div>
      ) : (
        curAddressList?.map((item) => (
          <div
            onClick={(e) => handleAddressItemClick(item)}
            key={item.id}
            className="mb-1 flex items-center bg-white bg-opacity-50 border-2 border-solid border-white"
          >
            <div className="mx-2">
              <Svg name="地址" size={28}></Svg>
            </div>
            <div className="py-2">
              <div className="flex items-center mb-2">
                {item.name} <span className="text-sm to-gray-600 mx-2">{item.phone}</span>{' '}
                {item.isDefault === 1 && (
                  <div className="w-8 text-center text-xs text-orange-500 border border-solid border-orange-500 rounded-md ">
                    默认
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {item.province}
                {item.city}
                {item.district}
                {item.address}
              </span>
            </div>
            <div className="flex-1 flex justify-end mx-2 cursor-pointer">
              <div className="mr-5" onClick={(e) => handleDelete(e, item)}>
                <Svg name="删除" size={28}></Svg>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/shop/addressInfo', { state: { addressInfo: item } })
                }}
              >
                <Svg name="编辑" size={26}></Svg>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

AddressList.displayName = 'AddressList'
export default memo(AddressList)
