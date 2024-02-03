import { reqVerifyToken } from '@/service/modules/user'
export async function verifyTokenPass(): Promise<false | Record<any, any>> {
  const token = localStorage.getItem('token')
  if (!token) return false
  const { code, userInfo } = await reqVerifyToken()
  if (code !== 200) return false
  return userInfo
}
