import { shallowEqualApp, useAppSelector } from '@/store'
import { Avatar, message } from 'antd'
import React, { memo, useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { formatUtc, arraySortByTime } from '@/utils/formatDate'
import SocketContext from '@/socket/socketContext'
interface IProps {
  children?: ReactNode
}

const Chat: FC<IProps> = (props) => {
  const socketClient = useContext(SocketContext)
  const { chatList, userInfo } = useAppSelector(
    (state) => ({
      chatList: state.chat.chatList,
      userInfo: state.user.userInfo
    }),
    shallowEqualApp
  )
  const chatListRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const myChatList = [...chatList]
    arraySortByTime(myChatList, 'updateTime')
    setCurChatList(myChatList)
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
  function handleTargetUserClick(item: any) {
    setCurChatTarget(item)
  }
  const [curInputVal, setCurInputVal] = useState('')
  const [curInputValLength, setCurInputValLength] = useState(0)
  function handleChatMsg(e: any) {
    setCurInputVal(e.target.innerText)
    setCurInputValLength(e.target.innerText.length)
  }
  function sentChatMsg() {
    const info = {
      fromUserId: userInfo.id,
      toUserId: curChatTarget.targetUserId,
      message: curInputVal
    }
    socketClient.emit('sendMessage', info)
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-[88vh] sm:w-[90%] sm:grid sm:grid-cols-10 bg-white rounded-md border border-solid border-gray-300">
        <aside className="hidden h-[88vh] sm:block sm:col-span-2  border-l-0  border-y-0 border-r border-solid border-gray-400">
          <header className="h-[6%] w-full flex justify-center items-center text-gray-400 bg-white border-b border-x-0 border-t-0 border-solid border-gray-300">
            最近消息
          </header>
          <div className="h-[94%] overflow-y-auto">
            {curChatList &&
              curChatList?.map((item) => (
                <div
                  key={item.targetUserId}
                  className={`p-2 pl-3 h-20 flex items-center justify-start ${
                    curChatTarget?.targetUserId === item.targetUserId ? 'bg-blue-200' : ''
                  } cursor-pointer border-b border-solid border-gray-300 `}
                  onClick={(e) => handleTargetUserClick(item)}
                >
                  <Avatar src={item.targetUserAvatar} size={45}></Avatar>
                  <div className="ml-4 flex flex-col ">
                    <h1 className="text-xl truncate">{item.targetUserName}</h1>
                    <span className="text-xs text-gray-500 truncate">
                      {item.messageList[item.messageList.length - 1].message}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </aside>
        <main className="sm:w-full h-[88vh] sm:col-span-8  bg-gray-100">
          <header className="h-[6%] w-full flex justify-center items-center bg-white shadow-sm">
            {curChatTarget?.targetUserName}
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
                    <div className="max-w-[80%] p-2 ml-2 bg-white rounded-md break-words">
                      <span className="w-full">{item.message}</span>
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
                    <div className="max-w-[80%] p-2 ml-2 bg-white rounded-md break-words">
                      <span className="w-full">{item.message}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className=" h-[24%] pt-2 pb-2 border-t border-x-0 border-b-0 border-solid border-gray-300">
            <div className="h-[10%] pl-3 text-xs text-start text-gray-500">聊天输入⬇</div>
            <div
              contentEditable="plaintext-only"
              aria-placeholder="聊天在这里输入"
              className="h-[70%] px-3 text-lg outline-none overflow-y-auto"
              onInput={(e) => handleChatMsg(e)}
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
                className="w-20 h-full flex items-center justify-center cursor-pointer select-none bg-white border border-solid border-gray-300"
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
