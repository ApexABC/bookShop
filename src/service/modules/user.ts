import request from '../index'
import qs from 'query-string'
export const reqVerifyToken = () => request.get({ url: '/admin' })
// 用户注册
export const reqRegister = (data: Record<any, any>) =>
  request.post({ url: '/admin', data: qs.stringify({ ...data }) })
// 用户登录
export const reqLogin = (data: Record<any, any>) =>
  request.post({ url: '/admin/login', data: qs.stringify({ ...data }) })
