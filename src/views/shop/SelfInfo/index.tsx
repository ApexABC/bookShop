import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Avatar, Upload, message, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  reqUpdateAvatar,
  reqUpdatePassword,
  reqUpdateUsername,
  reqUserRelation,
  reqVerifyToken
} from '@/service/modules/user'
import { setUserInfo } from '@/store/modules/user'
interface IProps {
  children?: ReactNode
}

const SelfInfo: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqualApp
  )
  useEffect(() => {
    fetchUserRelation()
  }, [])
  const [fansCount, setFansCount] = useState(0)
  const [followCount, setfollowCount] = useState(0)
  async function fetchUserRelation() {
    const { relation } = await reqUserRelation()
    setFansCount(relation?.fans.length)
    setfollowCount(relation?.follows.length)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [curModalStatus, setCurModalStatus] = useState('')
  const initInputVal = {
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  const [inputVals, setInputVals] = useState(initInputVal)
  function handleOpenModal(info: string) {
    setIsModalOpen(true)
    setCurModalStatus(info)
  }
  function handleInputVal(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    const val = e.target.value
    const myInputVals = { ...inputVals }
    switch (type) {
      case 'username':
        myInputVals.username = val
        break
      case 'oldPassword':
        myInputVals.oldPassword = val
        break
      case 'newPassword':
        myInputVals.newPassword = val
        break
      case 'confirmPassword':
        myInputVals.confirmPassword = val
        break
      default:
        break
    }
    setInputVals(myInputVals)
  }
  async function handleOk() {
    if (curModalStatus === '用户名') {
      if (inputVals.username.length <= 2) return message.warning('请输入长度大于二的用户名')
      const { code } = await reqUpdateUsername(inputVals.username)
      if (code === 201) {
        reloadUserInfo()
        resModal()
        return message.success('修改用户名成功')
      } else if (code === 400) return message.warning('用户名已存在,请重试')
      else return message.success('修改失败,请重试')
    } else if (curModalStatus === '密码') {
      const { confirmPassword, newPassword, oldPassword } = inputVals
      if (confirmPassword.length === 0 || newPassword.length === 0 || oldPassword.length === 0)
        return message.warning('输入不能为空')
      if (confirmPassword !== newPassword) return message.warning('两次输入的密码不一致')
      if (newPassword.length < 5) message.warning('输入密码长度不能小于五')
      const { code } = await reqUpdatePassword({ newPassword, oldPassword })
      if (code === 201) {
        message.success('修改密码成功')
        resModal()
        reloadUserInfo()
      } else if (code === 400) message.warning('旧密码错误')
      else message.warning('修改失败，请重试')
    }
  }
  function resModal() {
    setIsModalOpen(false)
    setInputVals(initInputVal)
  }
  async function handleUpdateAvatar({ file }: any) {
    const formData = new FormData()
    formData.append('avatar', file)
    const { code } = await reqUpdateAvatar(formData)
    if (code === 201) {
      message.success('头像更新成功')
      reloadUserInfo()
    } else {
      message.warning('头像更新失败，请重试')
    }
  }
  async function reloadUserInfo() {
    const { userInfo } = await reqVerifyToken()
    dispatch(setUserInfo(userInfo))
  }
  return (
    <div className="w-full px-3">
      <div className="text-center">
        <Avatar size={100} src={userInfo?.avatar} />
      </div>
      <div className="mt-2 text-center text-2xl font-bold">{userInfo?.username}</div>
      <div className="w-full my-2 flex items-center justify-center">
        <span
          className="mr-5 cursor-pointer"
          onClick={(e) => navigate('/shop/friendList', { state: { type: 'follow' } })}
        >
          关注 <span className="text-blue-500 font-bold">{followCount}</span>
        </span>
        <span
          className="cursor-pointer"
          onClick={(e) => navigate('/shop/friendList', { state: { type: 'fan' } })}
        >
          粉丝 <span className="text-blue-500 font-bold">{fansCount}</span>
        </span>
      </div>
      <ul className="p-2 pt-1 mt-8 bg-white rounded-xl shadow-md">
        <li
          onClick={(e) => handleOpenModal('用户名')}
          className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300"
        >
          更改用户名
        </li>
        <li
          onClick={(e) => handleOpenModal('密码')}
          className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300"
        >
          更改密码
        </li>

        <li className="h-10 pl-3 flex items-end cursor-pointer  border-b border-solid border-gray-300">
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            customRequest={handleUpdateAvatar}
            showUploadList={false}
          >
            <span className="hover:text-blue-500 text-lg">更新头像</span>
          </Upload>
        </li>

        <li
          onClick={(e) => navigate('/shop/addressList')}
          className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300"
        >
          收货地址
        </li>
      </ul>
      <Modal
        title={'更改' + curModalStatus}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={(e) => setIsModalOpen(false)}
      >
        <div className="w-full">
          {curModalStatus === '用户名' && (
            <div className="py-4">
              <span className="font-bold text-base mr-2">用户名:</span>
              <input
                value={inputVals.username}
                onChange={(e) => handleInputVal(e, 'username')}
                className="h-7 pl-2 w-[70%] rounded-md  outline-none border-green-500"
                placeholder="请输入要修改的用户名"
                type="text"
              />
            </div>
          )}
          {curModalStatus === '密码' && (
            <div className="py-4 flex flex-col justify-center w-full ">
              <div className="flex items-center">
                <span className="block font-bold text-base mr-2 w-[70px]">旧密码:</span>
                <input
                  value={inputVals.oldPassword}
                  onChange={(e) => handleInputVal(e, 'oldPassword')}
                  className="h-7 pl-2 w-[70%] rounded-md  outline-none border-green-500"
                  placeholder="请输入旧密码"
                  type="text"
                />
              </div>
              <div className="my-3 flex items-center">
                <span className="block font-bold text-base mr-2 w-[70px]">新密码:</span>
                <input
                  value={inputVals.newPassword}
                  onChange={(e) => handleInputVal(e, 'newPassword')}
                  className="h-7 pl-2 w-[70%] rounded-md  outline-none border-green-500"
                  placeholder="请输入新密码"
                  type="text"
                />
              </div>
              <div className="flex items-center">
                <span className="block font-bold text-base mr-2 w-[70px]">确认密码:</span>
                <input
                  value={inputVals.confirmPassword}
                  onChange={(e) => handleInputVal(e, 'confirmPassword')}
                  className="h-7 pl-2 w-[70%] rounded-md  outline-none border-green-500"
                  placeholder="确认新密码"
                  type="text"
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

SelfInfo.displayName = 'SelfInfo'
export default memo(SelfInfo)
