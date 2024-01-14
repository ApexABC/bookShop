import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import { ShopWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const Shop: FC<IProps> = (props) => {
  return (
    <ShopWrapper>
      <AppHeader></AppHeader>
      <div className="mt-20">
        <Suspense fallback="">
          <Outlet></Outlet>
        </Suspense>
      </div>
    </ShopWrapper>
  )
}

Shop.displayName = 'Shop'
export default memo(Shop)
