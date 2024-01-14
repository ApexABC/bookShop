import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { AppHeaderWrapper } from './style'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Logo from '../logo'
import Svg from '../Svg'
interface IProps {
  children?: ReactNode
}
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <NavLink to={'/admin'}>退出登录</NavLink>
  },
  {
    key: '2',
    label: <NavLink to={'/admin'}>后台管理</NavLink>
  }
]

const AppHeader: FC<IProps> = (props) => {
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY !== 0) {
        setIsScrollAtTop(false)
      } else {
        setIsScrollAtTop(true)
      }
    })
  }, [])
  const [isScrollAtTop, setIsScrollAtTop] = useState(true)
  const [isHamburOpen, setIsHamburOpen] = useState(false)
  const hamburBtn = classNames('sm:hidden', 'w-11', 'flex', 'justify-center', 'box-border', {
    'shadow-inner': isHamburOpen,
    'shadow-blue-500/50': isHamburOpen
  })
  return (
    <AppHeaderWrapper $isScrollAtTop={isScrollAtTop}>
      <div className="flex justify-start items-center min-h-20 sm:justify-between">
        <Logo></Logo>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-start">
          <ul className="flex justify-between ml-6 sm:w-3/4 lg:w-1/2 xl:w-1/3 ">
            <li>购物车</li>
            <li>订单</li>
            <li>购物车</li>
            <li>订单</li>
          </ul>
        </div>
        <div className="hidden sm:flex">
          <input
            className="w-20 h-6 pl-3 rounded-3xl border-white outline-none md:w-52  xl:mr-20"
            placeholder="搜索书籍"
            type="text"
          />
        </div>
        <div className="flex-1 flex justify-end mr-5 w-14 sm:flex-none">
          <Dropdown menu={{ items }} trigger={['click', 'hover']} placement="bottomLeft">
            <Avatar size="large" />
          </Dropdown>
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
            <li>购物车</li>
            <li>订单</li>
            <li>购物车</li>
            <li>订单</li>
          </ul>
        </div>
      </CSSTransition>
    </AppHeaderWrapper>
  )
}

AppHeader.displayName = 'AppHeader'
export default memo(AppHeader)
