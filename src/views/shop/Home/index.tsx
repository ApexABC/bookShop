import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = (props) => {
  return <div>Home</div>
}

Home.displayName = 'Home'
export default memo(Home)
