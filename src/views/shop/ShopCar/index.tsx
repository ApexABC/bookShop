import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const ShopCar: FC<IProps> = (props) => {
  return <div>ShopCar</div>
}

ShopCar.displayName = 'ShopCar'
export default memo(ShopCar)
