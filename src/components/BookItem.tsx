import { Rate } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Svg from './Svg'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  itemData: Record<any, any>
}

const BookItem: FC<IProps> = ({ itemData }) => {
  const navigate = useNavigate()
  return (
    <div
      className="flex flex-col cursor-pointer h-96 bg-white"
      onClick={(e) => navigate('/shop/bookDetail', { state: { curBookId: itemData.id } })}
    >
      <div className="flex items-center justify-center bg-[#f5f8fc] h-64">
        <img className="w-40 h-56" src={itemData.album} />
      </div>
      <div className="flex items-center justify-between h-11 px-3">
        <div className="text-xl font-semibold text-[#1b3764] w-3/4 truncate">{itemData.name}</div>
        <span className="text-lg font-semibold text-[#ffca42]">￥{itemData.price}</span>
      </div>
      <div className="line-clamp-2 px-2 text-[#969aa0] text-base">{itemData.describe}</div>
      <div className="flex items-center justify-between h-8 px-3">
        <div className="flex items-center">
          <Rate value={itemData.rate / 2} disabled allowHalf></Rate>
          <span className="ml-2">{itemData.rate}</span>
        </div>
        <Svg name="购物车" size={23} color="#888"></Svg>
      </div>
    </div>
  )
}

BookItem.displayName = 'BookItem'
export default memo(BookItem)
