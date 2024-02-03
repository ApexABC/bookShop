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

export const reqCartTotalCount = () => request.get({ url: '/order/cartCount' })
