import { reqUserRelation, reqCancelFollowUser, reqFollowUser } from '@/service/modules/user'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar, message } from 'antd'
interface IProps {
  children?: ReactNode
}

const FriendList: FC<IProps> = (props) => {
  const location = useLocation()
  useEffect(() => {
    setCurType(location.state.type)
    fetchUserRealtion()
  }, [])
  const [curType, setCurType] = useState('')
  const [curFollowList, setCurFollowList] = useState([])
  const [curFanList, setCurFanList] = useState([])
  async function fetchUserRealtion() {
    const { relation } = await reqUserRelation()
    setCurFollowList(relation.follows)
    setCurFanList(relation.fans)
  }
  async function handleFollowClick(item: any) {
    const { code } = await reqFollowUser(item.id)
    if (code === 201) message.success('回关成功')
    fetchUserRealtion()
  }
  async function handleCancelFollowClick(item: any) {
    const { code } = await reqCancelFollowUser(item.id)
    if (code === 201) message.success('取消关注成功，想要重新关注请搜索')
    fetchUserRealtion()
  }
  return (
    <div className="p-5">
      <header>
        <div className=" mt-2 h-13 flex items-center justify-between bg-gray-100">
          <span
            className={`w-1/2 h-9 flex items-center justify-center font-bold cursor-pointer ${
              curType === 'follow' ? 'shadow-inner bg-white text-blue-400' : ''
            }`}
            onClick={(e) => setCurType('follow')}
          >
            关注
          </span>
          <span
            className={`w-1/2 h-9 flex items-center justify-center font-bold cursor-pointer ${
              curType === 'fan' ? 'shadow-inner bg-white text-blue-400' : ''
            }`}
            onClick={(e) => setCurType('fan')}
          >
            粉丝
          </span>
        </div>
      </header>
      <main className="mt-1">
        {curType === 'follow' && (
          <div>
            {curFollowList.length === 0 ? (
              <div className="text-center font-bold mt-6">您还没有关注</div>
            ) : (
              <div>
                {curFollowList.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 cursor-pointer bg-white border-b border-solid border-gray-300"
                  >
                    <Avatar src={item.avatar} size={50}></Avatar>
                    <div className="ml-3 font-bold text-lg truncate">{item.username}</div>
                    <div className="flex-1 flex items-center justify-end">
                      <div className="w-14 h-8 mr-2 text-center leading-8 bg-blue-500 text-white rounded-md">
                        私信
                      </div>
                      <div
                        onClick={(e) => handleCancelFollowClick(item)}
                        className="w-20 h-8 text-center leading-8 bg-gray-500 text-white rounded-md"
                      >
                        取消关注
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {curType === 'fan' && (
          <div>
            {curFanList.length === 0 ? (
              <div className="text-center font-bold mt-6">您还没有粉丝</div>
            ) : (
              <div>
                {curFanList.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 bg-white border-b border-solid border-gray-300"
                  >
                    <Avatar src={item.avatar} size={50}></Avatar>
                    <div className="ml-3 font-bold text-lg truncate">{item.username}</div>
                    <div className="flex-1 flex items-center justify-end">
                      <div className="w-14 h-8 mr-2 text-center leading-8 bg-blue-500 cursor-pointer text-white rounded-md">
                        私信
                      </div>
                      {curFollowList?.some((i: any) => i.id === item.id) ? (
                        <div
                          //   onClick={(e) => handleCancelFollowClick(item)}
                          className="w-20 h-8 text-center leading-8 bg-white text-blue-500 rounded-md"
                        >
                          已回关
                        </div>
                      ) : (
                        <div
                          onClick={(e) => handleFollowClick(item)}
                          className="w-20 h-8 text-center leading-8 bg-pink-500 text-white rounded-md cursor-pointer"
                        >
                          回关
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

FriendList.displayName = 'FriendList'
export default memo(FriendList)
