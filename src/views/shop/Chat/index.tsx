import { shallowEqualApp, useAppSelector } from '@/store'
import { Avatar, message, Badge } from 'antd'
import React, { memo, useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { formatUtc, arraySortByTime } from '@/utils/formatDate'
import SocketContext from '@/socket/socketContext'
import Svg from '@/components/Svg'
let isFirst = true
interface IProps {
  children?: ReactNode
}
const Chat: FC<IProps> = (props) => {
  const socketClient = useContext(SocketContext)
  const { chatList, userInfo, humberIsOpen } = useAppSelector(
    (state) => ({
      chatList: state.chat.chatList,
      userInfo: state.user.userInfo,
      humberIsOpen: state.user.humberIsOpen
    }),
    shallowEqualApp
  )
  useEffect(() => {
    if (humberIsOpen) setIsShowAside(false)
  }, [humberIsOpen])
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsShowAside(true)
      return
    } // 如果是移动端那就不默认选择聊天让用户自己选
  }, [])
  const chatListRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const myChatList = [...chatList]
    arraySortByTime(myChatList, 'updateTime')
    setCurChatList(myChatList)
    if (isFirst) {
      isFirst = false
      if (window.innerWidth < 640) return
    }
    setCurChatTarget(myChatList[0])
  }, [chatList])
  useLayoutEffect(() => {
    const observer = new MutationObserver(() => {
      if (chatListRef.current) {
        // 使用scrollTo方法实现平滑滚动到底部
        chatListRef.current.scrollTo({
          top: chatListRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    })
    if (chatListRef.current) {
      observer.observe(chatListRef.current, {
        childList: true // 监听子元素的变化
      })
    }
    return () => observer.disconnect() // 清理函数中断开观察者
  }, [chatList])
  const [curChatList, setCurChatList] = useState<any[]>([])
  const [curChatTarget, setCurChatTarget] = useState<Record<string, any>>({})
  // 监听当前聊天目标，清楚设置消息为已读
  useEffect(() => {
    if (curChatTarget && Object.keys(curChatTarget)?.length !== 0) {
      if (curChatTarget.unRead <= 0) return
      const info = {
        fromUserId: curChatTarget.targetUserId,
        toUserId: userInfo.id
      }
      socketClient.emit('alreadyRead', info)
    }
  }, [curChatTarget])
  function handleTargetUserClick(item: any) {
    if (window.innerWidth < 640) {
      setIsShowAside(false)
    }
    setCurChatTarget(item)
  }
  const [curInputVal, setCurInputVal] = useState('')
  const [curInputValLength, setCurInputValLength] = useState(0)
  const divInputRef = useRef<HTMLDivElement>(null)
  function handleChatMsg(e: any) {
    const val = e.target.innerText.replace(/\n/g, '')
    if (val === '') divInputRef.current!.innerHTML = ''
    setCurInputVal(val)
    setCurInputValLength(val.length)
  }
  function handleChatInput(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') sentChatMsg()
  }
  function sentChatMsg() {
    if (curInputValLength <= 0) return
    if (curInputValLength > 1000) return message.warning('消息长度不能大于1000')
    const info = {
      fromUserId: userInfo.id,
      toUserId: curChatTarget.targetUserId,
      message: curInputVal
    }
    divInputRef.current!.innerHTML = ''
    setCurInputVal('')
    setCurInputValLength(0)
    socketClient.emit('sendMessage', info)
  }
  const [isShowAside, setIsShowAside] = useState(true)
  return (
    <div className="w-full  overflow-hidden flex items-center justify-center ">
      <div className="relative w-full h-[88vh] sm:w-[90%] sm:grid sm:grid-cols-10 bg-white rounded-md overflow-hidden">
        <aside
          className={`absolute sm:static w-full sm:w-auto sm:translate-x-0 ${
            !isShowAside && '-translate-x-full'
          } h-[88vh] bg-white transition-all duration-300  z-10 sm:col-span-3 lg:col-span-2  border-l-0  border-y-0 border-r border-solid border-gray-300`}
        >
          <header className="relative h-[6%] w-full flex justify-center items-center text-gray-400 bg-white border-b border-x-0 border-t-0 border-solid border-gray-300">
            最近消息
            <div
              className="absolute sm:hidden top-2 right-5 cursor-pointer"
              onClick={(e) => setIsShowAside(false)}
            >
              <Svg name="收起" size={20} color="#000"></Svg>
            </div>
          </header>
          <div className="h-[94%] overflow-y-auto w-full">
            {curChatList &&
              curChatList?.map((item) => (
                <div
                  key={item.targetUserId}
                  className={`p-2 pl-3 h-20 w-full flex items-center justify-start ${
                    curChatTarget?.targetUserId === item.targetUserId ? 'bg-blue-200' : ''
                  } cursor-pointer border-b border-solid border-gray-300 `}
                  onClick={(e) => handleTargetUserClick(item)}
                >
                  <div className="w-[50px] mr-2">
                    <Avatar src={item.targetUserAvatar} size={45}></Avatar>
                  </div>
                  <div className="w-[70%] relative flex flex-col ">
                    <h1 className="w-full text-xl truncate">{item.targetUserName}</h1>
                    <span className="w-full text-xs text-gray-500 truncate">
                      {item.messageList[item.messageList.length - 1].message}
                    </span>
                    <div className="absolute top-3 right-1">
                      <Badge count={item.unRead}></Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </aside>
        <main className="sm:w-full h-[88vh] sm:col-span-7 lg:col-span-8  bg-gray-100">
          <header className="relative h-[6%] w-full flex justify-center items-center bg-white shadow-sm">
            {curChatTarget?.targetUserName}

            <div
              className="absolute sm:hidden top-2 left-5 cursor-pointer"
              onClick={(e) => setIsShowAside(true)}
            >
              <Badge count={chatList?.reduce((per, cur) => per + cur.unRead, 0)} size="small">
                <Svg name="展开" size={20} color="#000" />
              </Badge>
            </div>
          </header>
          <div ref={chatListRef} className="w-full h-[70%] p-4 overflow-y-auto transition-all">
            {curChatTarget?.messageList?.map((item: any) => (
              <div key={item.createTime} className="w-full">
                <div className="text-center text-xs text-gray-400">
                  {formatUtc(item.createTime)}
                </div>
                {item.fromUserId === userInfo.id ? (
                  <div className="w-full flex items-start justify-end">
                    {/* 自己发的在右边 */}
                    <div className="max-w-[80%] leading-6 p-2 mr-2 bg-pink-200 rounded-md">
                      <span className="w-full ">{item.message}</span>
                    </div>
                    <div>
                      <Avatar src={userInfo.avatar} size={35}></Avatar>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex items-start justify-start">
                    <div>
                      <Avatar src={curChatTarget.targetUserAvatar} size={35}></Avatar>
                    </div>
                    <div className="max-w-[80%] leading-6 p-2 ml-2 bg-white rounded-md break-words">
                      <span className="w-full">{item.message}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className=" h-[24%] pt-2 pb-2 border-t border-x-0 border-b-0 border-solid border-gray-300">
            <div className="h-[10%] pl-3 mb-2 text-xs text-start text-gray-500">聊天输入⬇</div>
            <div
              contentEditable="plaintext-only"
              aria-placeholder="聊天在这里输入"
              className="h-[60%] px-3 text-lg outline-none overflow-y-auto"
              ref={divInputRef}
              onInput={(e) => handleChatMsg(e)}
              onKeyUp={(e) => handleChatInput(e)}
            ></div>
            <div className="h-[20%] px-2 my-1 w-full flex items-center justify-end">
              <span
                className={`mr-2 text-xs  ${
                  curInputValLength >= 1000 ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                {curInputValLength}/1000
              </span>
              <div
                onClick={sentChatMsg}
                className={`w-20 h-full flex items-center justify-center cursor-pointer select-none  ${
                  curInputValLength > 0 ? 'bg-blue-400 text-white' : ''
                }  border border-solid border-gray-300`}
              >
                发送
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

Chat.displayName = 'Chat'
export default memo(Chat)
