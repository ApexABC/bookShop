import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { AsideMenuWrapper } from './style'
interface IProps {
  children?: ReactNode
}
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('订单管理', '/order', <MailOutlined />),
  getItem('书籍管理', '/book', <MailOutlined />),

  getItem('榜单管理', '/rank', <AppstoreOutlined />),
  getItem('分类管理', '/sort', <MailOutlined />),
  //   { type: 'divider' },
  getItem('排行榜', 'sub6', <AppstoreOutlined />, [
    getItem('热门榜', '/hot'),
    getItem('新书榜', '14')
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ])
]

const AsideMenu: FC<IProps> = (props) => {
  const navgite = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navgite(`/admin${e.key}`)
  }
  return (
    <AsideMenuWrapper>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </AsideMenuWrapper>
  )
}

AsideMenu.displayName = 'AsideMenu'
export default memo(AsideMenu)
