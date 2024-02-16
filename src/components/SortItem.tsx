import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Svg from './Svg'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  itemData: Record<any, any>
}

const SortItem: FC<IProps> = ({ itemData }) => {
  const navigate = useNavigate()
  function handleSortItemClick(itemData: any) {
    navigate('/shop/bookList', { state: { title: itemData.name, sortId: itemData.id } })
  }
  return (
    <div
      onClick={(e) => handleSortItemClick(itemData)}
      className="flex flex-col cursor-pointer shadow-sm items-center justify-evenly  w-full h-28 bg-white rounded-xl"
    >
      <Svg name={itemData.name} size={35}></Svg>
      <span>{itemData.name}</span>
    </div>
  )
}

SortItem.displayName = 'SortItem'
export default memo(SortItem)
