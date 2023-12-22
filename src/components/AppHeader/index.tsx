import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppHeaderWrapper } from './style'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import HeaderCenter from './c-cpns/HeaderCenter'
import HeaderDown from './c-cpns/HeaderDown'

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
  const navigate = useNavigate()
  function handleClickLogo() {
    navigate('/shop')
  }
  return (
    <AppHeaderWrapper>
      <div className="header">
        <h1 className="header-left" onClick={handleClickLogo}>
          BookStore
        </h1>
        <div className="header-center">
          <HeaderCenter></HeaderCenter>
        </div>
        <div className="header-right">
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Avatar size="large" />
          </Dropdown>
        </div>
      </div>
      <div className="header-down">
        <HeaderDown></HeaderDown>
      </div>
    </AppHeaderWrapper>
  )
}

AppHeader.displayName = 'AppHeader'
export default memo(AppHeader)
