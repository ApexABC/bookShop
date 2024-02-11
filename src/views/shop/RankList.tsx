import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { reqRankBookListById } from '@/service/modules/rank'
import Svg from '@/components/Svg'
import { formatRate } from '@/utils/formatDate'
import AppFooter from '@/components/AppFooter'
interface IProps {
  children?: ReactNode
}

const RankList: FC<IProps> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { title, rankId } = location.state
  const [rankBookList, setRankBookList] = useState<any[]>()
  useEffect(() => {
    // window.scrollTo(0, 0)
    getRankBookList()
  }, [])
  async function getRankBookList() {
    const { data } = await reqRankBookListById(rankId)
    setRankBookList(data.bookList)
  }
  function rankColor(index: number, font = false): string {
    if (index === 0) return '#f75c03'
    if (index === 1) return '#f98030'
    if (index === 2) return '#f7ba1e'
    return font ? '#000' : '#e5e6eb'
  }
  return (
    <div>
      <h1 className="text-3xl font-bold ml-6 pt-5 mb-5">{title}</h1>
      <div className="mb-2 grid gap-1 lg:grid-cols-2 px-2">
        {rankBookList?.map((item, index) => (
          <div
            onClick={(e) => navigate('/shop/bookDetail', { state: { curBookId: item.id } })}
            key={item.id}
            className="flex p-2 cursor-pointer bg-white bg-opacity-50 border border-white border-solid"
          >
            <div className="w-20 hidden sm:block">
              <div className="relative w-[60px] h-[60px]">
                <Svg name="五边形" color={rankColor(index)} size={60}></Svg>
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold"
                  style={{ color: `${index < 3 ? '#fff' : '#86909c'}` }}
                >
                  {index + 1}
                </span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="w-32 h-44 mr-2">
                <img className=" w-32 h-44 object-fill" src={item.album} />
              </div>
              <div className="flex flex-col ">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <span className="my-3">{item.author}</span>
                {/* w-40 min-[450px]:w-full */}
                <div className="flex  w-[50vw] sm:w-full">
                  <span className="line-clamp-2 font-normal text-[#86909c]">{item.describe}</span>
                </div>
                <div className="mt-2 text-base text-[#1a66b3]">
                  <span className="mr-2">{item.pubtime}</span>
                  <span>{item.publisher}</span>
                </div>
                <div className="mt-3">
                  <span className=" text-xl text-[#f53f3f] font-bold">￥{item.price}</span>
                </div>
              </div>
            </div>
            <div className="w-10 text-2xl font-bold" style={{ color: `${rankColor(index, true)}` }}>
              {formatRate(item.rate)}
            </div>
          </div>
        ))}
      </div>
      <AppFooter></AppFooter>
    </div>
  )
}

RankList.displayName = 'RankList'
export default memo(RankList)
