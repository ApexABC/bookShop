import queryString from 'query-string'
import request from '../index'

export const reqCartList = () => request.get({ url: '/order/cartList' })

export const reqCartCount = (id: number, count: number) =>
  request.patch({ url: '/order/cartCount', data: queryString.stringify({ id, count }) })

export const reqDeleteCart = (ids: string) =>
  request.delete({
    url: '/order/deleteCart',
    data: queryString.stringify({ ids })
  })

export const reqAddCart = (bookId: number) =>
  request.post({ url: '/order/addCart', data: queryString.stringify({ bookId }) })

export const reqAddCartImmediate = (bookId: number) =>
  request.post({ url: '/order/addCart/immediate', data: queryString.stringify({ bookId }) })

export const reqCartTotalCount = () => request.get({ url: '/order/cartCount' })

// 地址相关
export const reqAddressList = () => request.get({ url: '/order/address' })

export const reqAddAddress = (info: Record<string, any>) =>
  request.post({ url: '/order/address', data: queryString.stringify(info) })

export const reqEditAddress = (info: any) =>
  request.patch({ url: '/order/address', data: queryString.stringify(info) })

export const reqDeleteAddress = (id: number) => request.delete({ url: `/order/address/${id}` })
// 订单相关
export const reqSubOrder = (info: Record<string, any>) =>
  request.post({
    url: '/order/subOrder',
    data: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

export const reqUserOrderList = () => request.get({ url: '/order/orderList/user' })

export const reqAdminOrderList = () => request.get({ url: '/order/orderList/admin' })

export const reqChangeOrderStatus = (info: any) =>
  request.post({ url: '/order/changeOrderStatus', data: queryString.stringify(info) })

export const reqSearchOrderStatus = () => request.get({ url: '/order/getOrderStatus' })
