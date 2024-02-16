import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
  itemData: Record<any, any>
}

const RankItem: FC<IProps> = ({ itemData }) => {
  const navigate = useNavigate()
  function handleSortItemClick(itemData: any) {
    navigate('/shop/rankList', { state: { title: itemData.name, rankId: itemData.id } })
  }
  return (
    <div
      onClick={(e) => handleSortItemClick(itemData)}
      className="flex flex-col cursor-pointer justify-between shrink-0 rounded-lg shadow-md bg-white w-full h-80 px-5 py-4"
    >
      <header className="text-xl font-semibold">{itemData.name}</header>
      <div className="relative w-full h-3/5 bg-cover bg-black">
        <img className="w-full h-full object-fill bg-white" src={itemData.img} />
      </div>

      <p className="line-clamp-2 text-[#4B5563]">{itemData.desc}</p>
      <span className="font-semibold text-[#336699]">查看更多</span>
    </div>
  )
}

RankItem.displayName = 'RankItem'
export default memo(RankItem)
