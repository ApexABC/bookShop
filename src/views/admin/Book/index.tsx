import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Book: FC<IProps> = (props) => {
  return <div>Book</div>
}

Book.displayName = 'Book'
export default memo(Book)
