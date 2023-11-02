import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Rank: FC<IProps> = (props) => {
  return <div>Rank</div>
}

Rank.displayName = 'Rank'
export default memo(Rank)
