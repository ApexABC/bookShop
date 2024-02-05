import OrderItem from '@/components/OrderItem'
import { reqCartList, reqDeleteCart, reqCartTotalCount } from '@/service/modules/order'
import { useAppDispatch } from '@/store'
import { setCartCount, setCartList as setCartListStore } from '@/store/modules/order'
import { Checkbox, Modal, message } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}
const { confirm } = Modal
const ShopCar: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    fetchCartList()
  }, [])
  const [cartList, setCartList] = useState<any[]>()
  async function fetchCartList() {
    const { cartList } = await reqCartList()
    setCartList(cartList)
  }
  const [checkedItemList, setCheckedItemList] = useState<any[]>([])
  const [checkedAllBox, setCheckedAllBox] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const handleItemBox = (e: any, item: any) => {
    const myCheckedItemList = [...checkedItemList]
    if (e.target.checked) {
      myCheckedItemList.push(item)
      setCheckedItemList(myCheckedItemList)
    } else {
      const index = myCheckedItemList.findIndex((i) => i.id === item.id)
      myCheckedItemList.splice(index, 1)
      setCheckedItemList(myCheckedItemList)
    }
    if (myCheckedItemList.length === cartList?.length) setCheckedAllBox(true)
    else setCheckedAllBox(false)
  }
  function handleAllBox(e: any) {
    if (e.target.checked) {
      setCheckedItemList(cartList!)
      setCheckedAllBox(true)
    } else {
      setCheckedItemList([])
      setCheckedAllBox(false)
    }
  }
  useEffect(() => {
    if (!cartList) return
    const res = checkedItemList.map((item) => {
      for (const i of cartList) {
        if (item.id === i.id) return i
      }
    })
    setCheckedItemList(res)
  }, [cartList])
  useEffect(() => {
    const total = checkedItemList.reduce((per, cur) => per + cur.price * cur.count, 0)
    setTotalPrice(total.toFixed(2))
  }, [checkedItemList])
  function handleDeleteCar() {
    if (checkedItemList.length === 0) return
    confirm({
      title: `确认删除这${checkedItemList.length}项?`,
      async onOk() {
        const ids = checkedItemList.map((item) => item.id).join(',')
        const { code } = await reqDeleteCart(ids)
        if (code === 201) {
          message.success('删除成功')
          setCheckedItemList([])
          fetchCartList()
          const { cartList } = await reqCartList()
          const { count } = await reqCartTotalCount()
          dispatch(setCartListStore(cartList))
          dispatch(setCartCount(count))
        }
      }
    })
  }
  function handleSubOrder() {
    navigate('/shop/subOrder', { state: { checkedItemList } })
  }
  return (
    <div className="pb-16">
      <h1 className="pt-3 pl-6 text-2xl font-bold mb-2">购物车</h1>
      {cartList?.length === 0 ? (
        <div className="text-2xl text-center font-bold text-gray-600 mt-10">
          您的购物车为空，请去选择书籍吧！
        </div>
      ) : (
        <div className="w-full h-ful px-6 md:px-12 lg:px-16 xl:px-20">
          {cartList &&
            cartList.map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full border-b-2 border-solid border-white"
              >
                <div className="mr-5">
                  <Checkbox
                    checked={checkedItemList?.find((i: any) => i.id === item.id)}
                    onChange={(e) => handleItemBox(e, item)}
                  ></Checkbox>
                </div>
                <div className="w-full">
                  <OrderItem itemData={item} fetchCartList={fetchCartList}></OrderItem>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="fixed bottom-0 w-full h-16 px-6 md:px-12 lg:px-16 xl:px-20 bg-white bg-opacity-80">
        <div className="flex items-center w-full h-full">
          <div className="mr-1">
            <Checkbox
              checked={checkedAllBox && checkedItemList.length !== 0}
              onChange={(e) => handleAllBox(e)}
            >
              <span className="select-none">全选</span>
            </Checkbox>
          </div>
          <div
            className="flex items-center justify-center select-none text-blue-600 cursor-pointer text-sm w-16 h-6 rounded-xl"
            onClick={handleDeleteCar}
          >
            删除已选
          </div>
          <div className="flex-1 flex justify-end items-center">
            <span className="flex items-center text-sm mr-2">
              合计<span className="text-orange-600 text-lg">￥{totalPrice}</span>
            </span>
            <button
              onClick={handleSubOrder}
              className="w-20 h-10 rounded-3xl cursor-pointer text-white bg-orange-600 font-bold text-base"
            >
              结算
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ShopCar.displayName = 'ShopCar'
export default memo(ShopCar)
