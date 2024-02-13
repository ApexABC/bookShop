import React, { memo, useEffect, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppHeaderWrapper } from './style'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Logo from '../logo'
import Svg from '../Svg'
import { verifyTokenPass } from '@/utils/verifyToken'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { setUserInfo } from '@/store/modules/user'
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
  const { userInfoStore, curPathName } = useAppSelector(
    (state) => ({
      userInfoStore: state.user.userInfo,
      curPathName: state.user.curPathName
    }),
    shallowEqualApp
  )
  const [curItems, setCurItems] = useState<MenuProps['items']>([
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
  ])
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY !== 0) {
        setIsScrollAtTop(false)
      } else {
        setIsScrollAtTop(true)
      }
    })
    testToken()
    if (userInfoStore?.type !== 'root') {
      // 判断是否为超管显示下拉菜单内容
      curItems?.pop()
      setCurItems(curItems)
    }
    return () => {
      window.removeEventListener('scroll', (e) => {
        if (window.scrollY !== 0) {
          setIsScrollAtTop(false)
        } else {
          setIsScrollAtTop(true)
        }
      })
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
  const [isHamburOpen, setIsHamburOpen] = useState(false)
  const hamburBtn = classNames('sm:hidden', 'w-11', 'flex', 'justify-center', 'box-border', {
    'shadow-inner': isHamburOpen,
    'shadow-blue-500/50': isHamburOpen
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
  function goSearchPage() {
    setSearchInputVal('')
    navigate('/shop/search', { state: { searchVal: searchInputVal } })
  }
  return (
    <AppHeaderWrapper $isScrollAtTop={isScrollAtTop}>
      <div className="flex justify-start items-center min-h-20 sm:justify-between ">
        <Logo></Logo>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
          <ul className="flex justify-between ml-6  sm:w-3/4 lg:w-1/2 xl:w-1/3 ">
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/car'
              })}
              onClick={(e) => navigate('/shop/car')}
            >
              购物车
            </li>
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/order'
              })}
              onClick={(e) => navigate('/shop/order')}
            >
              订单
            </li>
            <li
              className="cursor-pointer font-bold hover:text-blue-700 transition-all"
              onClick={(e) => navigate('/shop/chat')}
            >
              消息
            </li>
            <li
              className={classNames('cursor-pointer font-bold hover:text-blue-700 transition-all', {
                'text-[#1d4ed8]': curPathName === '/shop/selfInfo'
              })}
              onClick={(e) => navigate('/shop/selfInfo')}
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
              <Avatar size="large" src={userInfo.avatar} />
            </Dropdown>
          ) : (
            <span className="text-[#1e4aed] cursor-pointer" onClick={(e) => navigate('/login')}>
              <span className="text-black">请</span>登录
            </span>
          )}
        </div>
        <div className={hamburBtn} onClick={(e) => setIsHamburOpen(!isHamburOpen)}>
          {isHamburOpen ? <Svg name="关闭" size={40}></Svg> : <Svg name="汉堡菜单" size={40}></Svg>}
        </div>
      </div>
      <CSSTransition in={isHamburOpen} unmountOnExit={true} classNames="hambur" timeout={300}>
        <div
          className={classNames(
            'flex flex-col bg-white items-center justify-around h-52  w-full sm:hidden'
          )}
          style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderTop: '1px solid #ccc' }}
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
              className="cursor-pointer font-bold hover:text-blue-700 transition-all"
              onClick={(e) => navigate('/shop/car')}
            >
              购物车
            </li>
            <li className="cursor-pointer font-bold hover:text-blue-700 transition-all">订单</li>
            <li className="cursor-pointer font-bold hover:text-blue-700 transition-all">消息</li>
            <li className="cursor-pointer font-bold hover:text-blue-700 transition-all">
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
