import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const Admin: FC<IProps> = (props) => {
  return (
    <div>
      Admin
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

Admin.displayName = 'Admin'
export default memo(Admin)
