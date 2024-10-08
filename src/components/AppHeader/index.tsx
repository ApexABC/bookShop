import React, { memo, useEffect, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppHeaderWrapper } from './style'
import { Avatar, Dropdown, Badge } from 'antd'
import type { MenuProps } from 'antd'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Logo from '../logo'
import Svg from '../Svg'
import { verifyTokenPass } from '@/utils/verifyToken'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { setHumberIsOpen, setUserInfo } from '@/store/modules/user'
import { reqCartTotalCount, reqCartList } from '@/service/modules/order'
import { setCartCount, setCartList } from '@/store/modules/order'
import debounce from 'lodash/debounce'
import { reqSearchUserByLike } from '@/service/modules/user'
import { searchBook } from '@/service/modules/book'
interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userInfoStore, curPathName, curChatList } = useAppSelector(
    (state) => ({
      userInfoStore: state.user.userInfo,
      curPathName: state.user.curPathName,
      curChatList: state.chat.chatList
    }),
    shallowEqualApp
  )
  const list = [
    {
      key: '1',
      label: <span>Hi! {userInfoStore?.username}</span>
    },
    {
      key: '2',
      label: <span onClick={handleLoginOut}>退出登录</span>
    },
    {
      key: '3',
      label: <NavLink to={'/admin'}>后台管理</NavLink>
    }
  ]
  const [curItems, setCurItems] = useState<MenuProps['items']>([...list])
  const [curUnReadNum, setCurUnReadNum] = useState(0)
  // 未读消息
  useEffect(() => {
    const unReadNum = curChatList.reduce((per, cur) => per + cur.unRead, 0)
    setCurUnReadNum(unReadNum)
  }, [curChatList])
  useEffect(() => {
    if (!curItems) return
    const myCurItems = [...list]
    myCurItems[0] = {
      key: '1',
      label: <span>Hi! {userInfoStore?.username}</span>
    }
    if (userInfoStore?.type !== 'root') {
      // 判断是否为超管显示下拉菜单内容
      myCurItems?.pop()
    }
    setCurItems(myCurItems)
  }, [userInfoStore])
  function isAtTop() {
    if (window.scrollY !== 0) {
      setIsScrollAtTop(false)
    } else {
      setIsScrollAtTop(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', isAtTop)
    testToken()
    return () => {
      window.removeEventListener('scroll', isAtTop)
    }
  }, [])

  function handleLoginOut() {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const [userInfo, setuserInfo] = useState<false | Record<any, any>>(false)
  async function testToken() {
    const result = await verifyTokenPass()
    if (!result) {
      // 不通过token操作
      dispatch(setCartCount(0))
      return setuserInfo(false)
    }
    setuserInfo(result)
    dispatch(setUserInfo(result))
    // 加载个人购物车信息
    const { cartList } = await reqCartList()
    const { count } = await reqCartTotalCount()
    dispatch(setCartList(cartList))
    dispatch(setCartCount(count))
  }
  const [isScrollAtTop, setIsScrollAtTop] = useState(true)
  const [isHumburOpen, setIsHumburOpen] = useState(false)
  useEffect(() => {
    dispatch(setHumberIsOpen(isHumburOpen))
  }, [isHumburOpen])
  const hamburBtn = classNames('sm:hidden', 'w-11', 'flex', 'justify-center', 'box-border', {
    'shadow-inner': isHumburOpen,
    'shadow-blue-500/50': isHumburOpen
  })
  const [searchInputVal, setSearchInputVal] = useState('')
  const [searchUserRes, setSearchUserRes] = useState([])
  const [searchBookRes, serSearchBookRes] = useState([])
  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setSearchInputVal(val)
    if (val === '') return
    debouncedSearch(val)
  }
  const debouncedSearch = useCallback(debounce(searchInfo, 500), [])
  async function searchInfo(val: string) {
    const { userList } = await reqSearchUserByLike(val)
    setSearchUserRes(userList)
    const {
      data: { bookList }
    } = await searchBook(val)
    serSearchBookRes(bookList)
  }
  function reset() {
    setSearchInputVal('')
    setIsHumburOpen(false)
  }
  function goSearchPage() {
    reset()
    navigate('/shop/search', { state: { searchVal: searchInputVal } })
  }
  function handleGoOtherPage(pageRoute: string) {
    reset()
    navigate(pageRoute)
  }
  function goBookDetailPage(item: any) {
    reset()
    navigate('/shop/bookDetail', { state: { curBookId: item.id } })
  }
  function goToOtherUserPage(item: any) {
    reset()
    if (item.id === userInfoStore.id) return navigate('/shop/selfInfo')
    navigate('/shop/userInfo', { state: { otherUserId: item.id } })
  }
  return (
    <AppHeaderWrapper $isScrollAtTop={isScrollAtTop}>
      <div className="flex justify-start items-center min-h-20 sm:justify-between ">
        <Logo></Logo>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
          <ul className="flex items-center justify-between ml-6  sm:w-3/4 lg:w-1/2 xl:w-1/3 ">
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/car'
              })}
              onClick={(e) => handleGoOtherPage('/shop/car')}
            >
              购物车
            </li>
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/order'
              })}
              onClick={(e) => handleGoOtherPage('/shop/order')}
            >
              订单
            </li>
            <li
              className={`cursor-pointer transition-all hover:text-blue-700 `}
              onClick={(e) => handleGoOtherPage('/shop/chat')}
            >
              <Badge count={curUnReadNum} size="small" offset={[8, 0]}>
                <span
                  className={`font-bold text-base hover:text-blue-700 ${
                    curPathName === '/shop/chat' && 'text-[#1d4ed8]'
                  }`}
                >
                  消息
                </span>
              </Badge>
            </li>
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/selfInfo'
              })}
              onClick={(e) => handleGoOtherPage('/shop/selfInfo')}
            >
              个人信息
            </li>
          </ul>
        </div>
        <div className="hidden sm:flex">
          <div className="relative flex justify-center">
            <div className="w-20 h-8 relative md:w-52 mr-5">
              <input
                className="w-full md:w-52  pl-3 h-8 rounded-3xl border-violet-300 outline-none "
                placeholder="搜索"
                type="text"
                autoComplete="off"
                value={searchInputVal}
                onChange={(e) => handleSearchInput(e)}
                onKeyUp={(e) => {
                  if (e.code === 'Enter') goSearchPage()
                }}
              />
              <div className="absolute top-[5px] -right-1 cursor-pointer" onClick={goSearchPage}>
                <Svg name="search" size={25} color="#aaa"></Svg>
              </div>
            </div>
            {searchInputVal !== '' && (
              <div className="absolute top-10 -left-5 md:left-0 w-[25vw] lg:w-[21vw] xl:w-[17vw] h-72 px-2 py-2 pt-2 bg-white border border-solid  border-gray-300 rounded-lg shadow-sm">
                <span className="block text-sm font-bold text-blue-600">搜索书籍</span>
                <ul className="my-1 pt-1 h-[40%] w-full  overflow-y-scroll ">
                  {searchBookRes.length === 0 ? (
                    <span className=" block w-full text-center text-xl text-gray-500">
                      暂无结果
                    </span>
                  ) : (
                    searchBookRes?.map((item: any) => (
                      <li
                        onClick={(e) => goBookDetailPage(item)}
                        key={item.id}
                        className="flex items-center w-full h-10 cursor-pointer border-b border-solid border-gray-400"
                      >
                        <img src={item.album} className=" w-6 mr-2" />
                        <span className="flex items-center w-full truncate">
                          <span className=" text-black mr-1">{item.name}</span>--
                          <span className=" text-gray-500 text-sm ml-1">{item.author}</span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
                <span className="block text-sm font-bold text-blue-600">搜索用户</span>
                <ul className="my-1 pt-1 h-[40%]  overflow-y-scroll ">
                  {searchUserRes.length === 0 ? (
                    <span className=" block w-full text-center text-xl text-gray-500">
                      暂无结果
                    </span>
                  ) : (
                    searchUserRes?.map((item: any) => (
                      <li
                        onClick={(e) => goToOtherUserPage(item)}
                        key={item.id}
                        className="flex items-center  h-10 cursor-pointer border-b border-solid border-gray-400"
                      >
                        <Avatar src={item.avatar} size={32} />
                        <span className="flex items-center w-full truncate ml-1">
                          <span className=" text-black mr-1">{item.username}</span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-end mr-5 w-14 sm:flex-none">
          {userInfo ? (
            <Dropdown
              menu={{ items: curItems }}
              trigger={['click', 'hover']}
              placement="bottomLeft"
            >
              <Avatar size="large" src={userInfoStore.avatar} />
            </Dropdown>
          ) : (
            <span className="text-[#1e4aed] cursor-pointer" onClick={(e) => navigate('/login')}>
              <span className="text-black">请</span>登录
            </span>
          )}
        </div>
        <div
          className={hamburBtn}
          onClick={(e) => {
            setIsHumburOpen(!isHumburOpen)
            setSearchInputVal('')
          }}
        >
          {isHumburOpen ? (
            <Svg name="关闭" size={40}></Svg>
          ) : (
            <Badge count={curUnReadNum} size="small" offset={[-10, 3]}>
              <Svg name="汉堡菜单" size={40}></Svg>
            </Badge>
          )}
        </div>
      </div>
      <CSSTransition in={isHumburOpen} unmountOnExit={true} classNames="hambur" timeout={300}>
        <div
          className={classNames(
            'flex flex-col bg-white items-center z-20 justify-around h-52 w-full sm:hidden'
          )}
          style={{
            borderTop: '1px solid #ccc'
          }}
        >
          <div
            className="absolute top-[88px] right-[13%] cursor-pointer z-10"
            onClick={goSearchPage}
          >
            <Svg name="search" size={25} color="#aaa"></Svg>
          </div>
          <div className="w-full relative flex justify-center">
            <input
              className="w-3/4 h-7 my-7 pl-3 rounded-3xl border-purple-400 outline-none"
              style={{ margin: '0 auto' }}
              placeholder="搜索"
              type="text"
              value={searchInputVal}
              onChange={(e) => handleSearchInput(e)}
              onKeyUp={(e) => {
                if (e.code === 'Enter') goSearchPage()
              }}
            />

            {searchInputVal !== '' && (
              <div className="absolute top-9 w-[80%] h-64 px-2 pt-1 bg-white border border-solid  border-gray-300 rounded-sm shadow-sm">
                <span className="block text-sm font-bold text-blue-600">搜索书籍</span>
                <ul className="my-1 pt-1 h-[40%] w-full  overflow-y-scroll ">
                  {searchBookRes.length === 0 ? (
                    <span className=" block w-full text-center text-xl text-gray-500">
                      暂无结果
                    </span>
                  ) : (
                    searchBookRes?.map((item: any) => (
                      <li
                        onClick={(e) => goBookDetailPage(item)}
                        key={item.id}
                        className="flex items-center w-full h-10 cursor-pointer border-b border-solid border-gray-400"
                      >
                        <img src={item.album} className=" w-6 mr-2" />
                        <span className="flex items-center w-full truncate">
                          <span className=" text-black mr-1">{item.name}</span>--
                          <span className=" text-gray-500 text-sm ml-1">{item.author}</span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
                <span className="block text-sm font-bold text-blue-600">搜索用户</span>
                <ul className="my-1 pt-1 h-[40%]  overflow-y-scroll ">
                  {searchUserRes.length === 0 ? (
                    <span className=" block w-full text-center text-xl text-gray-500">
                      暂无结果
                    </span>
                  ) : (
                    searchUserRes?.map((item: any) => (
                      <li
                        onClick={(e) => goToOtherUserPage(item)}
                        key={item.id}
                        className="flex items-center  h-10 cursor-pointer border-b border-solid border-gray-400"
                      >
                        <Avatar src={item.avatar} size={32} />
                        <span className="flex items-center w-full truncate ml-1">
                          <span className=" text-black mr-1">{item.username}</span>
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
          <ul className="ham-ul flex flex-col justify-between  sm:w-3/4 lg:w-1/2 xl:w-1/3 ">
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/car'
              })}
              onClick={(e) => handleGoOtherPage('/shop/car')}
            >
              购物车
            </li>
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/order'
              })}
              onClick={(e) => handleGoOtherPage('/shop/order')}
            >
              订单
            </li>

            <li
              className={`cursor-pointer transition-all hover:text-blue-700 `}
              onClick={(e) => handleGoOtherPage('/shop/chat')}
            >
              <Badge count={curUnReadNum} size="small" offset={[8, 0]}>
                <span
                  className={`font-bold text-base hover:text-blue-700 ${
                    curPathName === '/shop/chat' && 'text-[#1d4ed8]'
                  }`}
                >
                  消息
                </span>
              </Badge>
            </li>

            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/selfInfo'
              })}
              onClick={(e) => handleGoOtherPage('/shop/selfInfo')}
            >
              个人信息
            </li>
          </ul>
        </div>
      </CSSTransition>
    </AppHeaderWrapper>
  )
}

AppHeader.displayName = 'AppHeader'
export default memo(AppHeader)
