import React, { memo, useState } from 'react'
import type { FC, ReactNode, ChangeEvent, KeyboardEvent } from 'react'
import { useAppDispatch } from '@/store'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import img from '@/assets/img/Login Art .png'
import { LoginWrapper } from './style'
import { reqLogin, reqRegister } from '@/service/modules/user'
import { setUserInfo } from '@/store/modules/user'
interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()

  const [isLogin, setIsLoginStatus] = useState(true)
  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const navigate = useNavigate()
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setNameInput(e.target.value)
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.target.value)
  }
  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }
  async function handleSubmit() {
    if (nameInput.length < 3 || passwordInput.length < 6) {
      return message.warning('请输入长度大于两位用户名和大于五位的密码')
    }
    if (!isLogin) {
      //注册状态
      const { code } = await reqRegister({ username: nameInput, password: passwordInput })
      if (code === -1001) return message.warning('用户名已存在，请切换后重试')
    }
    const { code, userInfo, token } = await reqLogin({
      username: nameInput,
      password: passwordInput
    })
    if (code === -1001) return message.warning('用户不存在，请重试')
    if (code === -1002) return message.warning('密码错误，清重试')
    message.success('登录成功')
    localStorage.setItem('token', 'Bearer ' + token)
    dispatch(setUserInfo(userInfo))
    // navigate(-1)
    navigate('/')
  }
  function handleChangeStatus() {
    setIsLoginStatus(!isLogin)
  }
  return (
    <LoginWrapper>
      <div className="bg-white w-full h-screen overflow-hidden p-4">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center justify-center w-full lg:w-[60%] h-full ">
            <div className="flex flex-col w-full h-full lg:w-1/2 lg:h-3/4  p-2">
              <div className="flex lg:hidden items-center justify-center w-full h-[20%]">
                <img className="w-full h-full text-center" src={img} alt="" />
              </div>
              <h1 className="py-2 text-2xl font-bold">{isLogin ? '欢迎回来' : '注册账号'}</h1>
              <span className="pb-6 text-sm text-[#a6a6a6]">
                {isLogin ? '登录' : '注册'}您的账号
              </span>
              <span className="pb-1 text-base font-bold">用户名</span>
              <input
                className="h-12 pl-4 bg=[#fafafa] text-base placeholder:text-[#b8b8b8] placeholder:text-base rounded-lg  border-cyan-100 outline-none"
                type="text"
                placeholder="请输入用户名"
                onChange={(e) => handleNameChange(e)}
                onKeyDown={(e) => handleInputKeyDown(e)}
              />
              <span className="pb-1 pt-2 text-base font-bold">密码</span>
              <input
                className="h-12 pl-4 bg=[#fafafa] text-base placeholder:text-[#b8b8b8] placeholder:text-base rounded-lg border-cyan-100  outline-none"
                type="password"
                placeholder="请输入密码"
                onChange={(e) => handlePasswordChange(e)}
                onKeyDown={(e) => handleInputKeyDown(e)}
              />
              <button
                onClick={handleSubmit}
                className="mt-10 h-11 cursor-pointer hover:bg-[#364d5a] transition duration-300 bg-[#162d3a] text-white text-base rounded-3xl"
              >
                {isLogin ? '登录' : '注册并登录'}
              </button>
              <div className="text-center mt-3 text-base text-[#a6a6a6]">
                {isLogin ? '还没有账户？' : '已有账号？'}
                <span onClick={handleChangeStatus} className="cursor-pointer text-[#1e4ae9]">
                  {isLogin ? '注册' : '登录'}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-[39%] h-full">
            <img className="w-full h-full" src={img} alt="" />
          </div>
        </div>
      </div>
    </LoginWrapper>
  )
}

Login.displayName = 'Login'
export default memo(Login)
