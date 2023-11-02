import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
interface IProps {
  children?: ReactNode
}

const Shop: FC<IProps> = (props) => {
  return (
    <div>
      <AppHeader></AppHeader>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

Shop.displayName = 'Shop'
export default memo(Shop)
