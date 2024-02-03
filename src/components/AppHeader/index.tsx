import React, { memo, useEffect, useState } from 'react'
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
    if (!result) return setuserInfo(false)
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
  console.log('header', curPathName)

  return (
    <AppHeaderWrapper $isScrollAtTop={isScrollAtTop}>
      <div className="flex justify-start items-center min-h-20 sm:justify-between ">
        <Logo></Logo>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
          <ul className="flex justify-between ml-6  sm:w-3/4 lg:w-1/2 xl:w-1/3 ">
            <li
              style={{ color: `${curPathName === '/shop/car' ? '#1d4ed8' : '#000'}` }}
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
        <div className="hidden sm:flex">
          <input
            className="w-20 h-8 pl-3 rounded-3xl border-violet-300 outline-none md:w-52  xl:mr-20"
            placeholder="搜索书籍"
            type="text"
          />
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
          style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid #fff' }}
        >
          <input
            className="w-3/4 h-6 my-7 pl-3 rounded-3xl border-white outline-none"
            style={{ margin: '0 auto' }}
            placeholder="搜索书籍"
            type="text"
          />
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
