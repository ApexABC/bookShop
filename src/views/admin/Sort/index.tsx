import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const AdminSort: FC<IProps> = (props) => {
  return <div>AdminSort</div>
}

AdminSort.displayName = 'AdminSort'
export default memo(AdminSort)
