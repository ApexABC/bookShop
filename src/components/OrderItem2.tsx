import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  itemData: Record<string, any>
}

const Home: FC<IProps> = ({ itemData }) => {
  return (
    <div className="flex items-center mb-1">
      <div className="w-20 h-32 mr-4">
        <img className="w-20 h-full" src={itemData.album} />
      </div>
      <div className="flex flex-col justify-between h-32 py-4 w-full">
        <div className="flex items-center justify-between w-full">
          <span className="flex justify-start font-bold text-gray-500 w-full h-4 line-clamp-1">
            {itemData.name}
          </span>
          <span className="flex w-full justify-end text-gray-400">× {itemData.totalCount}</span>
        </div>
        <span className="flex-1 flex mt-2 justify-start text-sm text-gray-400 w-full h-14 line-clamp-3">
          {itemData.author}
        </span>
        <div className="w-full flex justify-start font-bold text-gray-500">
          ￥{itemData.totalPrice}
        </div>
      </div>
    </div>
  )
}

Home.displayName = 'Home'
export default memo(Home)
