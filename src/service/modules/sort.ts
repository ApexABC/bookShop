import request from '../index'
import qs from 'query-string'
export const reqSortList = () => request.get({ url: '/sort' })

export const reqAddSort = (name: string) =>
  request.post({ url: '/sort', data: qs.stringify({ name }) })

export const reqEditSort = (id: number, name: string) =>
  request.patch({ url: `/sort/${id}`, data: qs.stringify({ name }) })

export const reqDeleteSort = (id: number) => request.delete({ url: `/sort/${id}` })

export const reqBindBookSort = (sortId: number, bookId: number) =>
  request.post({ url: '/sort/bindBook', data: qs.stringify({ sortId, bookId }) })

export const reqDeleteAllByBookId = (bookId: number) =>
  request.delete({ url: `/sort/deleteAllByBookId/${bookId}` }).catch((err) => Promise.reject(err))

export const reqSearchSortByBookId = (bookId: number) =>
  request.get({ url: '/sort/searchByBookId', params: { bookId } })
