import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import AsideMenu from './c-cpns/AsideMenu'
import { AdminWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const Admin: FC<IProps> = (props) => {
  return (
    <AdminWrapper>
      <div className="page-header">
        <p>图书商城后台系统</p>
      </div>
      <div className="page-content">
        <div className="aside">
          <AsideMenu />
        </div>
        <div className="right">
          {/* <div className="header"></div> */}
          <div className="content">
            <Suspense fallback="loading...">
              <Outlet></Outlet>
            </Suspense>
          </div>
        </div>
      </div>
    </AdminWrapper>
  )
}

Admin.displayName = 'Admin'
export default memo(Admin)
