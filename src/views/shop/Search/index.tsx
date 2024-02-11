import React, { memo, useEffect, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchBook } from '@/service/modules/book'
import {
  reqCancelFollowUser,
  reqFollowUser,
  reqSearchUserByLike,
  reqUserRelation
} from '@/service/modules/user'
import BookItem from '@/components/BookItem'
import { Avatar, message } from 'antd'
import debounce from 'lodash/debounce'
// import { shallowEqualApp, useAppSelector } from '@/store'
import { verifyTokenPass } from '@/utils/verifyToken'
interface IProps {
  children?: ReactNode
}

const Search: FC<IProps> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  // const { curUserInfo } = useAppSelector(
  //   (state) => ({
  //     curUserInfo: state.user.userInfo
  //   }),
  //   shallowEqualApp
  // )
  useEffect(() => {
    searchInfo(location.state.searchVal)
    setCurInputVal(location.state.searchVal)
  }, [])
  const [curInputVal, setCurInputVal] = useState('')
  const [searchUserRes, setSearchUserRes] = useState([])
  const [searchBookRes, serSearchBookRes] = useState([])
  const [curFollowUserList, serCurFollowUserList] = useState([])
  async function searchInfo(val: string) {
    const { userList } = await reqSearchUserByLike(val)
    setSearchUserRes(userList)
    const {
      data: { bookList }
    } = await searchBook(val)
    serSearchBookRes(bookList)
    const { relation } = await reqUserRelation()
    if (relation?.follows) serCurFollowUserList(relation.follows)
  }
  const debouncedSearch = useCallback(debounce(searchInfo, 500), [])
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurInputVal(e.target.value)
    debouncedSearch(e.target.value)
  }
  async function handleFollowClick(item: any) {
    if (!(await verifyTokenPass())) return navigate('/login')
    const { code } = await reqFollowUser(item.id)
    if (code === 201) message.success('关注成功')
    searchInfo(curInputVal)
  }
  async function handleCancelFollowClick(item: any) {
    const { code } = await reqCancelFollowUser(item.id)
    if (code === 201) message.success('取消关注成功')
    searchInfo(curInputVal)
  }
  const [curType, setCurType] = useState('书籍')
  return (
    <div className="p-4 ">
      <header className="mb-1">
        <div className="w-full flex justify-center ">
          <input
            className="w-[90%] h-10 pl-5 rounded-3xl text-lg text-blue-400 border-green-300 outline-pink-300 placeholder:text-lg placeholder:text-blue-400"
            type="text"
            value={curInputVal}
            onChange={(e) => handleInputChange(e)}
            placeholder="请输入要搜索的内容"
          />
        </div>
        <div className=" mt-2 h-13 flex items-center justify-between bg-gray-100">
          <span
            className={`w-1/2 h-9 flex items-center justify-center font-bold cursor-pointer ${
              curType === '书籍' ? 'shadow-inner bg-white text-blue-400' : ''
            }`}
            onClick={(e) => setCurType('书籍')}
          >
            书籍
          </span>
          <span
            className={`w-1/2 h-9 flex items-center justify-center font-bold cursor-pointer ${
              curType === '用户' ? 'shadow-inner bg-white text-blue-400' : ''
            }`}
            onClick={(e) => setCurType('用户')}
          >
            用户
          </span>
        </div>
      </header>
      {curType === '书籍' && (
        <div>
          {searchBookRes.length === 0 ? (
            <div className="text-center font-bold mt-6">没有查询到书籍名和作者名</div>
          ) : (
            <div className="grid gap-x-2 gap-y-2 mb-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {searchBookRes.map((item: any) => (
                <BookItem itemData={item} key={item.id}></BookItem>
              ))}
            </div>
          )}
        </div>
      )}
      {curType === '用户' && (
        <div>
          {searchUserRes.length === 0 ? (
            <div className="text-center font-bold mt-6">没有查询到用户结果</div>
          ) : (
            searchUserRes.map((item: any) => (
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
                  {curFollowUserList?.some((i: any) => i.id === item.id) ? (
                    <div
                      onClick={(e) => handleCancelFollowClick(item)}
                      className="w-20 h-8 text-center leading-8 bg-gray-500 text-white rounded-md"
                    >
                      取消关注
                    </div>
                  ) : (
                    <div
                      onClick={(e) => handleFollowClick(item)}
                      className="w-20 h-8 text-center leading-8 bg-pink-500 text-white rounded-md"
                    >
                      关注
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

Search.displayName = 'Search'
export default memo(Search)
