import { shallowEqualApp, useAppSelector } from '@/store'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { reqUserRelation } from '@/service/modules/user'
interface IProps {
  children?: ReactNode
}

const SelfInfo: FC<IProps> = (props) => {
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
    setFansCount(relation.fans.length)
    setfollowCount(relation.follows.length)
  }
  return (
    <div className="w-full px-3">
      <div className="text-center">
        <Avatar size={100} src={userInfo.avatar} />
      </div>
      <div className="mt-2 text-center text-2xl font-bold">{userInfo.username}</div>
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
        <li className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300">
          更改用户名
        </li>
        <li className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300">
          更改密码
        </li>
        <li className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300">
          更改头像
        </li>
        <li
          onClick={(e) => navigate('/shop/addressList')}
          className="h-10 pl-3 flex items-end cursor-pointer hover:text-blue-500 text-lg border-b border-solid border-gray-300"
        >
          收货地址
        </li>
      </ul>
    </div>
  )
}

SelfInfo.displayName = 'SelfInfo'
export default memo(SelfInfo)
