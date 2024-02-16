import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reqVerifyToken } from '@/service/modules/user'
import { useAppDispatch } from '@/store'
import { setCurPathName, setUserInfo } from '@/store/modules/user'
import { message } from 'antd'
const allowNoTokenPath = [
  '/shop',
  '/shop/home',
  '/shop/bookList',
  '/shop/rankList',
  '/shop/bookDetail',
  '/shop/search'
]
// const noScrollTopPath = ['/shop/bookList', '/shop/rankList']
const AuthRoute = (props?: any) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setCurPathName(location.pathname))
    // console.log(location.pathname)
    if (allowNoTokenPath.includes(location.pathname)) return
    testToken(location.pathname)
  }, [location.pathname])
  const adminCanPath = [
    '/admin',
    '/admin/dashBoard',
    '/admin/order',
    '/admin/book',
    '/admin/rank',
    '/admin/sort'
  ]
  async function testToken(path: string) {
    const { code, userInfo } = await reqVerifyToken()
    if (code === 401 || !token) navigate('/login')
    if (adminCanPath.includes(path) && userInfo.type !== 'root') {
      navigate('/shop')
      message.warning('您不是管理员')
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  async function getUserInfo() {
    const { userInfo } = await reqVerifyToken()
    dispatch(setUserInfo(userInfo))
  }
  return
}

export default AuthRoute
