import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const UserInfo: FC<IProps> = (props) => {
  return <div>UserInfo</div>
}

UserInfo.displayName = 'UserInfo'
export default memo(UserInfo)
