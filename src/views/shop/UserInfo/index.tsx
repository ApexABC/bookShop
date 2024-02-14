import {
  reqOtherUserInfo,
  reqUserRelation,
  reqCancelFollowUser,
  reqFollowUser
} from '@/service/modules/user'

import React, { memo, useEffect, useState, useContext } from 'react'
import type { FC, ReactNode } from 'react'
import { Avatar, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { shallowEqualApp, useAppSelector } from '@/store'
import SocketContext from '@/socket/socketContext'
interface IProps {
  children?: ReactNode
}

const UserInfo: FC<IProps> = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqualApp
  )
  useEffect(() => {
    if (!location.state?.otherUserId) return
    fetchOtherUserInfo()
  }, [location.state])
  const [curUserRelation, setCurUserRelation] = useState<Record<string, any>>({})
  const [otherUserInfo, setOtherUserInfo] = useState<Record<string, any>>({})
  async function fetchOtherUserInfo() {
    const { otherUserInfo } = await reqOtherUserInfo(location.state.otherUserId)
    setOtherUserInfo(otherUserInfo)
    const { relation } = await reqUserRelation()
    setCurUserRelation(relation)
  }
  async function handleFollowClick() {
    const { code } = await reqFollowUser(otherUserInfo.id)
    if (code === 201) message.success('关注成功')
    fetchOtherUserInfo()
  }
  async function handleCancelFollowClick() {
    const { code } = await reqCancelFollowUser(otherUserInfo.id)
    if (code === 201) message.success('取消关注成功')
    fetchOtherUserInfo()
  }
  const socketClient = useContext(SocketContext)
  function goToChat() {
    const info = {
      fromUserId: userInfo.id,
      toUserId: otherUserInfo.id,
      message: '我向你发送了私信，快来和我聊天吧'
    }
    socketClient.emit('sendMessage', info)
    navigate('/shop/chat')
  }
  return (
    <div className="w-full px-3">
      <div className="text-center">
        <Avatar size={100} src={otherUserInfo.avatar} />
      </div>
      <div className="mt-2 text-center text-2xl font-bold">{otherUserInfo.username}</div>
      <div className="w-full my-2 flex items-center justify-center">
        <span className="mr-5 cursor-pointer" onClick={(e) => message.warning('无权查看他人关注')}>
          关注 <span className="text-blue-500 font-bold">{otherUserInfo.followCount}</span>
        </span>
        <span className="cursor-pointer" onClick={(e) => message.warning('无权查看他人粉丝')}>
          粉丝 <span className="text-blue-500 font-bold">{otherUserInfo.fansCount}</span>
        </span>
      </div>
      <div className="pt-11 flex justify-center items-center">
        <div className="w-52 flex items-center justify-between">
          <span
            onClick={goToChat}
            className="w-20 h-10 flex items-center justify-center rounded-lg bg-blue-500 cursor-pointer text-white text-lg"
          >
            私信
          </span>
          {curUserRelation?.follows?.some((item: any) => item.id === otherUserInfo.id) ? (
            <span
              onClick={handleCancelFollowClick}
              className="w-20 h-10 flex items-center justify-center rounded-lg bg-gray-500 cursor-pointer text-white text-lg"
            >
              已关注
            </span>
          ) : (
            <span
              onClick={handleFollowClick}
              className="w-20 h-10 flex items-center justify-center rounded-lg bg-pink-500 cursor-pointer text-white text-lg"
            >
              关注
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

UserInfo.displayName = 'UserInfo'
export default memo(UserInfo)
