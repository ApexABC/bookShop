import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Svg from '@/components/Svg'
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
  getItem('仪表盘', '/dashBoard', <Svg name="仪表盘" />),
  getItem('订单管理', '/order', <Svg name="订单" />),
  getItem('书籍管理', '/book', <Svg name="书吧" />),
  getItem('榜单管理', '/rank', <Svg name="榜单" />),
  getItem('分类管理', '/sort', <Svg name="分类" />),
  //   { type: 'divider' },
  getItem('排行榜', 'sub6', <AppstoreOutlined />, [
    getItem('热门榜', '/hot'),
    getItem('新书榜', '14')
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
        defaultSelectedKeys={['/dashBoard']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </AsideMenuWrapper>
  )
}

AsideMenu.displayName = 'AsideMenu'
export default memo(AsideMenu)
