import request from '../index'
import qs from 'query-string'
export const reqRankList = () => request.get({ url: '/rank' })

export const reqdeleteRank = (id: number) => request.delete({ url: `/rank/${id}` })

export const reqAddRank = (name: string) =>
  request.post({
    url: '/rank',
    data: qs.stringify({ name, rank: '1,2,3' })
  })

export const reqUpdateRank = (info: any) =>
  request.patch({ url: `/rank/${info.id}`, data: qs.stringify(info) })

export const reqRankBookListById = (id: number) =>
  request.get({ url: `/rank/searchBookRankListById/${id}` })
