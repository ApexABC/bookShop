import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Input, Button, Avatar, message, Popconfirm } from 'antd'
import classNames from 'classnames'
import { formatUtc } from '@/utils/formatDate'
import Svg from '@/components/Svg'
import { reqAddBookComment, reqBookCommentLike, reqDeleteBookComment } from '@/service/modules/book'
import { useNavigate } from 'react-router-dom'
import { shallowEqualApp, useAppSelector } from '@/store'
const { TextArea } = Input
interface IProps {
  children?: ReactNode
  curBookId: number
  commentList: any[]
  fetchBookInfo: () => void
}

const BookComment: FC<IProps> = ({ commentList, curBookId, fetchBookInfo }) => {
  const navigate = useNavigate()
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqualApp
  )
  const [textIsFocus, setTextIsFocus] = useState(false)
  const [curCommentVal, setCurCommentVal] = useState<string>()
  async function handlePubComment() {
    if (!curCommentVal) return
    const { code } = await reqAddBookComment({
      bookId: curBookId,
      comment: curCommentVal
    })
    if (code === 401) {
      navigate('/shop/login')
    } else if (code === 201) {
      message.success('评论成功')
      setCurCommentVal('')
      setTextIsFocus(false)
      fetchBookInfo()
    } else {
      message.warning('评论失败，请重试')
    }
  }
  async function handleDeleteComment(item: any) {
    const { code } = await reqDeleteBookComment({
      id: item.id,
      userId: userInfo.id,
      parentId: item.parentId
    })
    if (code === 401) {
      navigate('/shop/login')
    } else if (code === 201) {
      message.success('删除评论成功')
      fetchBookInfo()
    } else {
      message.warning('删除失败，请重试')
    }
  }
  const [curCommentReplay, setCurCommentReplay] = useState<any>()
  const [curReplayVal, setCurReplayVal] = useState<string>()
  async function handlePubReplay(item: any) {
    if (!curReplayVal) return
    const info = {
      bookId: curBookId,
      parentId: item.parentId === null ? item.id : item.parentId,
      comment: curReplayVal,
      quote: item.username
    }
    const { code } = await reqAddBookComment(info)
    if (code === 401) {
      navigate('/shop/login')
    } else if (code === 201) {
      message.success('评论成功')
      setCurReplayVal('')
      setCurCommentReplay(-1)
      fetchBookInfo()
    } else {
      message.warning('评论失败，请重试')
    }
  }
  async function commentLike(item: any) {
    const info = {
      id: item.id,
      like: item.like,
      likeList: item.likeList.length === 0 ? null : item.likeList.join(',')
    }
    const { code } = await reqBookCommentLike(info)
    if (code === 401) {
      navigate('/shop/login')
    } else if (code === 2011) {
      message.success('点赞取消成功')
      fetchBookInfo()
    } else if (code === 2012) {
      message.success('点赞成功')
      fetchBookInfo()
    } else {
      message.warning('点赞失败，请重试')
    }
  }

  const [commentSortType, setCommentSortType] = useState('like')
  const [curCommentList, setCurCommentList] = useState<any>([])
  useEffect(() => {
    const ICommentList = [...commentList]
    if (commentSortType === 'like') {
      ICommentList?.sort((a, b) => b.like - a.like)
      setCurCommentList(ICommentList)
    } else {
      ICommentList?.sort((a, b) => {
        if (a.createTime > b.createTime) return -1
        if (a.createTime < b.createTime) return 1
        return 0
      })
      setCurCommentList(ICommentList)
    }
  }, [commentList, commentSortType])
  function switchCommentSortType(type: string) {
    setCommentSortType(type)
  }
  return (
    <div
      className="pt-4 px-5 sm:px-10 md:px-16 lg:px-20 xl:px-40 2xl:px-52"
      style={{ borderTop: '1px solid #ccc' }}
    >
      <div className="flex items-center mb-4">
        <TextArea
          rows={textIsFocus ? 4 : 1}
          placeholder="发表你的评论吧"
          value={curCommentVal}
          onFocus={(e) => setTextIsFocus(true)}
          // onBlur={(e) => setTextIsFocus(false)}
          onChange={(e: any) => setCurCommentVal(e.target.value)}
        />
        <Button
          onClick={handlePubComment}
          type="primary"
          className={classNames('ml-2', { hidden: !textIsFocus })}
        >
          发布
        </Button>
      </div>
      <div className="h-full">
        <div className="w-full flex justify-end text-gray-500">
          <span
            className="hover:text-pink-400 cursor-pointer mr-2"
            style={{ color: `${commentSortType === 'like' ? '#f472bd' : '#6b7280'}` }}
            onClick={(e) => switchCommentSortType('like')}
          >
            按点赞
          </span>
          <span
            className="hover:text-pink-400 cursor-pointer"
            style={{ color: `${commentSortType === 'time' ? '#f472bd' : '#6b7280'}` }}
            onClick={(e) => switchCommentSortType('time')}
          >
            按时间
          </span>
        </div>
        {curCommentList?.map((item: any) => (
          <div key={item.id} className="flex mb-5">
            <div className="mr-3">
              <Avatar size={'large'} src={item.avatar} />
            </div>
            <div className="mt-2 w-full flex flex-col pb-4 border-b border-gray-300 border-solid">
              <div>
                <span className="mr-3 text-pink-400">{item.username}</span>
                <span className="text-sm text-gray-400">{formatUtc(item.createTime)}</span>
              </div>
              <span className="mt-4 leading-5">{item.comment}</span>
              <div className="flex items-center mt-3 h-4">
                <div
                  className="flex items-center cursor-pointer hover:bg-pink-200"
                  onClick={(e) => commentLike(item)}
                >
                  <Svg
                    name="赞"
                    color={item.likeList?.includes(userInfo?.id) ? '#f472bd' : '#777'}
                  ></Svg>
                  <span
                    className="ml-2 "
                    style={{
                      color: `${item.likeList?.includes(userInfo?.id) ? '#f472bd' : '#777'}`
                    }}
                  >
                    {item.like}
                  </span>
                </div>
                <span
                  className="flex items-center cursor-pointer ml-3 text-sm text-gray-500 hover:text-blue-600"
                  onClick={(e) => setCurCommentReplay(item.id)}
                >
                  回复
                </span>
                <Popconfirm
                  title="删除评论"
                  description={`确认要删除此评论吗`}
                  onConfirm={(e) => handleDeleteComment(item)}
                  okText="确认删除"
                  cancelText="取消"
                >
                  <span
                    className="cursor-pointer ml-3 text-sm text-gray-500 hover:text-blue-600"
                    style={{
                      display: `${
                        userInfo?.id === item.userId || userInfo?.type === 'root' ? 'block' : 'none'
                      }`
                    }}
                  >
                    删除
                  </span>
                </Popconfirm>
              </div>
              <div
                className={'flex items-center mb-4 mt-3'}
                style={{ display: `${curCommentReplay === item.id ? 'flex' : 'none'}` }}
              >
                <TextArea
                  value={curReplayVal}
                  onChange={(e) => setCurReplayVal(e.target.value)}
                  rows={1}
                  placeholder={`回复 @${item.username}`}
                />
                <Button
                  onClick={(e) => handlePubReplay(item)}
                  type="primary"
                  className={classNames('ml-2')}
                >
                  发布
                </Button>
              </div>
              {item.children?.map((itemChildren: any) => (
                <div key={itemChildren.id} className="flex mt-3">
                  <div className="mr-3">
                    <Avatar size={'large'} src={itemChildren.avatar} />
                  </div>
                  <div className="w-full">
                    <div>
                      <span className="mr-3 text-pink-400">{itemChildren.username}</span>
                      <span className="text-sm text-gray-400">
                        {formatUtc(itemChildren.createTime)}
                      </span>
                    </div>
                    <div className="mt-2 ">
                      <span>
                        回复<span className="text-blue-700">@{itemChildren.quote}</span>:
                      </span>
                      <span className="ml-2 leading-5">{itemChildren.comment}</span>
                    </div>
                    <div className="flex items-center mt-3 h-4">
                      <div
                        className="flex items-center cursor-pointer hover:bg-pink-200"
                        onClick={(e) => commentLike(itemChildren)}
                      >
                        <Svg
                          name="赞"
                          color={itemChildren.likeList?.includes(userInfo?.id) ? '#f472bd' : '#777'}
                        ></Svg>
                        <span
                          className="ml-2 "
                          style={{
                            color: `${
                              itemChildren.likeList?.includes(userInfo?.id) ? '#f472bd' : '#777'
                            }`
                          }}
                        >
                          {itemChildren.like}
                        </span>
                      </div>
                      <span
                        className="flex items-center cursor-pointer ml-3 text-sm text-gray-500 hover:text-blue-600"
                        onClick={(e) => setCurCommentReplay(itemChildren.id)}
                      >
                        回复
                      </span>
                      <Popconfirm
                        title="删除评论"
                        description={`确认要删除此评论吗`}
                        onConfirm={(e) => handleDeleteComment(itemChildren)}
                        okText="确认删除"
                        cancelText="取消"
                      >
                        <span
                          className="cursor-pointer ml-3 text-sm text-gray-500 hover:text-blue-600"
                          style={{
                            display: `${
                              userInfo?.id === itemChildren.userId || userInfo?.type === 'root'
                                ? 'block'
                                : 'none'
                            }`
                          }}
                        >
                          删除
                        </span>
                      </Popconfirm>
                    </div>
                    <div
                      className="flex items-center mb-4 mt-3"
                      style={{
                        display: `${curCommentReplay === itemChildren.id ? 'flex' : 'none'}`
                      }}
                    >
                      <TextArea
                        value={curReplayVal}
                        onChange={(e) => setCurReplayVal(e.target.value)}
                        rows={1}
                        placeholder={`回复 @${itemChildren.username}`}
                      />
                      <Button
                        onClick={(e) => handlePubReplay(itemChildren)}
                        type="primary"
                        className={classNames('ml-2')}
                      >
                        发布
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

BookComment.displayName = 'BookComment'
export default memo(BookComment)
