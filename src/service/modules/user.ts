import request from '../index'
import qs from 'query-string'
export const reqVerifyToken = () => request.get({ url: '/admin' })
// 用户注册
export const reqRegister = (data: Record<any, any>) =>
  request.post({ url: '/admin', data: qs.stringify({ ...data }) })
// 用户登录
export const reqLogin = (data: Record<any, any>) =>
  request.post({ url: '/admin/login', data: qs.stringify({ ...data }) })

export const reqSearchUserByLike = (like:string)=> request.get({url:'/admin/like',params:{like}})
// 修改用户头像
export const reqUpdateAvatar = (data:any)=> request.post({url:'/admin/avatar',data})
// 修改用户密码
export const reqUpdatePassword = (info:Record<string,any>) => request.patch({url:'/admin/password',data:qs.stringify(info)})
// 修改用户名
export const reqUpdateUsername = (username:string) => request.patch({url:'/admin/username',data:qs.stringify({username})})
// 关注
export const reqFollowUser = (toUserId:number)=>request.post({url:'/admin/follow',data:qs.stringify({toUserId})})
// 取消关注
export const reqCancelFollowUser = (toUserId:number)=>request.delete({url:'/admin/follow',data:qs.stringify({toUserId})})
// 获得好友关系
export const reqUserRelation = () =>request.get({url:'/admin/relation'})
// 获取他人信息
export const reqOtherUserInfo = (userId:number)=>request.get({url:'/admin/getOtherUserInfo',params:{userId}})