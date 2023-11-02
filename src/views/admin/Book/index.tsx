import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Book: FC<IProps> = (props) => {
  return <div>book</div>
}

Book.displayName = 'Book'
export default memo(Book)
