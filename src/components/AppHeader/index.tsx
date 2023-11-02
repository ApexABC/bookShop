import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { AppHeaderWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = (props) => {
  return (
    <AppHeaderWrapper>
      <div className="header">
        <NavLink to={'/admin'}>changeRouter</NavLink>
      </div>
    </AppHeaderWrapper>
  )
}

AppHeader.displayName = 'AppHeader'
export default memo(AppHeader)
