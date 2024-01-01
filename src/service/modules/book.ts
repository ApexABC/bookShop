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
