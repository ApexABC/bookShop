import OrderItem from '@/components/OrderItem'
import Svg from '@/components/Svg'
import { reqAddressList, reqSubOrder, reqCartTotalCount } from '@/service/modules/order'
import { useAppDispatch } from '@/store'
import { setCartCount } from '@/store/modules/order'
import { message, Spin } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const SubOrder: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { checkedItemList } = location.state
  useEffect(() => {
    fetchAddressList()
  }, [])
  const [curAddressList, setCurAddressList] = useState<any[]>()
  const [curDefaultAddress, setCurDefaultAddress] = useState<Record<string, any>>({})
  async function fetchAddressList() {
    const { addressList } = await reqAddressList()
    setCurAddressList(addressList)
    setCurDefaultAddress(addressList?.find((item: any) => !!item.isDefault))
  }
  const [isSpinning, setIsSpinning] = useState(false)
  async function handleSubOrder() {
    if (Object.keys(checkedItemList).length === 0) message.warning('请添加收货地址')
    setIsSpinning(true)
    const goods = checkedItemList.map((item: any) => ({
      cartId: item.id,
      bookId: item.bookId,
      totalCount: item.count,
      totalPrice: Number((item.count * item.price).toFixed(2))
    }))
    const info = {
      goods,
      address: `${curDefaultAddress?.province}${curDefaultAddress?.city}${curDefaultAddress?.district}${curDefaultAddress?.address}`
    }
    const { code, message: warningMessage } = await reqSubOrder(info)
    const { count } = await reqCartTotalCount()
    dispatch(setCartCount(count))
    setTimeout(() => {
      setIsSpinning(false)
      if (code === -1001) return message.warning(warningMessage)
      if (code === 201) {
        navigate('/shop/boughtSuccess')
      }
    }, 1500)
  }
  return (
    <Spin spinning={isSpinning} tip={'模拟支付中...'}>
      <div>
        <div className="bg-slate-100 rounded-lg mx-2 p-2 sm:mx-4 overflow-hidden">
          <div className="flex items-center p-2 bg-white mb-3 rounded-md shadow-sm">
            <div className="mr-2">
              <Svg name="地址" size={30}></Svg>
            </div>
            <div>
              <div className="mb-1">
                <span className="mr-1">{curDefaultAddress?.name}</span>
                <span className="text-sm text-gray-400">{curDefaultAddress?.phone}</span>
              </div>
              <span className="text-sm text-gray-600">
                {curDefaultAddress?.province}
                {curDefaultAddress?.city}
                {curDefaultAddress?.district}
                {curDefaultAddress?.address}
              </span>
            </div>
          </div>
          <div className="px-2 pb-2 bg-white rounded-md shadow-sm">
            {checkedItemList.map((item: any) => (
              <div key={item.id} className=" border-b border-solid border-gray-300">
                <OrderItem itemData={item} orderStatus={true}></OrderItem>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 h-16 w-full bg-white">
          <div className="flex items-center justify-end w-full h-full ">
            <span className="text-sm text-gray-400 mr-1">
              共{checkedItemList.reduce((per: any, cur: any) => per + cur.count, 0)}件
            </span>
            <span className="text-sm mr-1">合计:</span>
            <span className="text-orange-500 font-bold mr-3">
              ￥{checkedItemList.reduce((per: any, cur: any) => per + cur.price * cur.count, 0)}
            </span>
            <button
              onClick={handleSubOrder}
              className="w-20 h-10 bg-orange-500 text-lg font-bold cursor-pointer text-white rounded-3xl"
            >
              购买
            </button>
          </div>
        </div>
      </div>
    </Spin>
  )
}

SubOrder.displayName = 'SubOrder'
export default memo(SubOrder)
