import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reqVerifyToken } from '@/service/modules/user'
const allowNoTokenPath = ['/shop', '/shop/home', '/shop/bookList', '/shop/rankList']
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
  return
}

export default AuthRoute
