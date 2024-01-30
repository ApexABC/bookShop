import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reqVerifyToken } from '@/service/modules/user'
import { useAppDispatch } from '@/store'
import { setUserInfo } from '@/store/modules/user'
const allowNoTokenPath = [
  '/shop',
  '/shop/home',
  '/shop/bookList',
  '/shop/rankList',
  '/shop/bookDetail'
]
const AuthRoute = (props?: any) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    console.log(location.pathname)
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
  const dispatch = useAppDispatch()
  async function getUserInfo() {
    const { userInfo } = await reqVerifyToken()
    dispatch(setUserInfo(userInfo))
  }
  return
}

export default AuthRoute
