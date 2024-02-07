import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reqVerifyToken } from '@/service/modules/user'
import { useAppDispatch } from '@/store'
import { setCurPathName, setUserInfo } from '@/store/modules/user'
const allowNoTokenPath = [
  '/shop',
  '/shop/home',
  '/shop/bookList',
  '/shop/rankList',
  '/shop/bookDetail'
]
// const noScrollTopPath = ['/shop/bookList', '/shop/rankList']
const AuthRoute = (props?: any) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    // if (!noScrollTopPath.includes(location.pathname)) window.scrollTo(0, 0)
    dispatch(setCurPathName(location.pathname))
    // console.log(location.pathname)
    if (allowNoTokenPath.includes(location.pathname)) return
    testToken()
  }, [location.pathname])
  async function testToken() {
    const { code } = await reqVerifyToken()
    if (code === 401 || !token) navigate('/login')
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
