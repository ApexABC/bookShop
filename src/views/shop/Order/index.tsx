import Svg from '@/components/Svg'
import {
  reqChangeOrderStatus,
  reqSearchOrderStatus,
  reqUserOrderList
} from '@/service/modules/order'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { formatUtc } from '@/utils/formatDate'
import OrderItem2 from '@/components/OrderItem2'
import { message, Badge } from 'antd'
interface IProps {
  children?: ReactNode
}
const orderType = ['全部', '待发货', '待收货', '已完成']
const Order: FC<IProps> = (props) => {
  useEffect(() => {
    fetchOrderList()
  }, [])
  const [curOrderList, setCurOrderList] = useState<any[]>([])
  const [curShowOrderList, setCurShowOrderList] = useState<any[]>([])
  const [curOrderType, setCurOrderType] = useState('全部')
  const [orderStatusInfo, setOrderStatusInfo] = useState<Record<string, any>>({})
  async function fetchOrderList() {
    const res = await reqUserOrderList()
    setCurOrderList(res.orderList)
    filterOrderListByType(res.orderList, curOrderType)
    const { status } = await reqSearchOrderStatus()
    setOrderStatusInfo(status)
  }
  function changeOrderStatus(type: string) {
    setCurOrderType(type)
    filterOrderListByType(curOrderList, type)
  }
  function filterOrderListByType(orderList: any[], type: string) {
    if (type === '全部') return setCurShowOrderList(orderList)
    else if (type === '待发货')
      return setCurShowOrderList(orderList.filter((item) => item.status === 1))
    else if (type === '待收货')
      return setCurShowOrderList(orderList.filter((item) => item.status === 2))
    else if (type === '已完成')
      return setCurShowOrderList(orderList.filter((item) => item.status === 3))
  }
  function formatStatus(status: number) {
    if (status === 1) return '待发货'
    if (status === 2) return '待收货'
    if (status === 3) return '已完成'
  }
  // 确认收货
  async function handleConfirmReceive(item: any) {
    const { code } = await reqChangeOrderStatus({ id: item.id, status: 3 })
    if (code === 200) message.success('确认收货成功')
    fetchOrderList()
  }
  return (
    <div className="w-full h-full  px-2 sm:px-4 md:px-6 lg:px-7">
      <h1 className="pt-3 pl-3 text-2xl font-bold mb-2">订单</h1>
      <div className="w-full h-full bg-white px-4 py-2 rounded-lg">
        <header className="flex items-center justify-between bg-white w-full">
          {orderType.map((typeName) => (
            <li
              key={typeName}
              onClick={(e) => changeOrderStatus(typeName)}
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <Badge count={orderStatusInfo[typeName]}>
                <Svg
                  name={typeName}
                  size={30}
                  color={`${curOrderType === typeName ? '#3b82f6' : '#000'}`}
                />
              </Badge>

              <span
                style={{
                  color: `${curOrderType === typeName ? '#3b82f6' : '#000'}`,
                  fontWeight: `${curOrderType === typeName ? '700' : '400'}`
                }}
                className="mt-1 text-sm"
              >
                {typeName}
              </span>
            </li>
          ))}
        </header>
      </div>
      {curOrderList.length === 0 ? (
        <div className="text-2xl text-center font-bold text-gray-600 mt-10">
          您的还没购买过书籍，快去下单吧！
        </div>
      ) : (
        <div className="mt-2">
          {curShowOrderList
            ?.sort((a: any, b: any) => {
              if (a.createTime > b.createTime) return -1
              else if (a.createTime < b.createTime) return 1
              else return 0
            })
            .map((item) => (
              <div
                key={item.id}
                className="w-full mb-1 p-3 text-center bg-white rounded-lg shadow-lg "
              >
                <div className="flex items-center justify-between py-2 mb-1 border-b border-solid border-gray-200">
                  <span className="text-gray-400">{formatUtc(item.createTime)}</span>
                  <span className="text-sm text-blue-500">{formatStatus(item.status)}</span>
                </div>
                <div>
                  {item.boughtList.map((i: any) => (
                    <OrderItem2 itemData={i} key={i.id}></OrderItem2>
                  ))}
                </div>
                <div className="w-full flex justify-end items-center">
                  <span className="text-sm text-gray-400 mr-1">总金额:</span>
                  <span className="text-xl font-bold text-gray-600">${item.totalPrice}</span>
                </div>
                {item.status === 2 && (
                  <div className="w-full flex justify-end mt-2">
                    <button
                      onClick={(e) => handleConfirmReceive(item)}
                      className="w-20 h-8 bg-blue-500 rounded-3xl text-white cursor-pointer"
                    >
                      确认收货
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

Order.displayName = 'Order'
export default memo(Order)
