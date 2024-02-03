import queryString from 'query-string'
import request from '../index'

export const reqBookList = (limit?: number, offset?: number) =>
  request.get({ url: '/books', params: { limit, offset } })

export const updataBook = (data: any) =>
  request.patch({
    url: `/books/${data.id}`,
    data
  })

export const deleteBook = (id: number) =>
  request.delete({
    url: `/books/${id}`
  })

export const addBook = (data: any) => request.post({ url: '/books', data })

export const searchBook = (like: string, limit?: 1000, offset?: 0) =>
  request.get({
    url: '/books/like',
    params: {
      like,
      limit,
      offset
    }
  })

export const searchRandomBook = (limit = 10) =>
  request.get({ url: '/books/random', params: { limit } })

export const searchBookListBySortId = (sortId: any) =>
  request.get({ url: '/sort/searchBookListBySortId', params: { sortId } })

export const searchBookDetailById = (id: number) =>
  request.get({ url: '/books/detail', params: { id } })

export const reqBookCommentListById = (id: number) =>
  request.get({ url: '/books/comment', params: { bookId: id } })

export const reqAddBookComment = (info: any) =>
  request.post({
    url: '/books/comment',
    data: queryString.stringify(info)
  })

export const reqDeleteBookComment = (info: any) =>
  request.delete({
    url: '/books/comment/delete',
    data: queryString.stringify(info)
  })

export const reqBookCommentLike = (info: any) =>
  request.post({
    url: '/books/comment/like',
    data: queryString.stringify(info)
  })

export const reqChangeBookInventory = (info: any) =>
  request.post({
    url: '/books/inventory',
    data: queryString.stringify(info)
  })
