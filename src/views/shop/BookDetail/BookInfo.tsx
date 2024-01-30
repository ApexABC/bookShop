import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Rate } from 'antd'
interface IProps {
  children?: ReactNode
  bookInfo: any
}

const BookInfo: FC<IProps> = ({ bookInfo }) => {
  return (
    bookInfo && (
      <div className="bg-white bg-opacity-50 pb-4">
        <div className="flex flex-col items-center sm:hidden">
          <div className="flex justify-center">
            <img className="w-52 h-80 shadow-xl" src={bookInfo.album} />
          </div>
          <h1 className="text-2xl mt-3 font-bold">{bookInfo.name}</h1>
          <span className="mt-1 text-sm text-[#818285]">{bookInfo.author}</span>
          <div className="mt-1">
            <Rate value={bookInfo.rate / 2} disabled allowHalf style={{ fontSize: 14 }} />
            <span className="ml-1">{bookInfo.rate}</span>
          </div>
          <div className="mt-4 px-6 text-sm text-[#818285] line-clamp-4">{bookInfo.describe}</div>
          <div className="flex justify-between w-full px-10 mt-3">
            <button className="w-28 h-10 bg-yellow-300 font-medium">添加购物车</button>
            <button className="w-28 h-10 bg-red-500 text-white font-medium">立即购买</button>
          </div>
        </div>
        <div className="hidden  sm:flex border border-white p-10 md:px-[10%] lg:px-[20%] w-full h-[65vh]">
          <div className="flex justify-between  w-full h-[100%]">
            <div className="flex items-center justify-center bg-[#f5f8fc] w-[43%]  h-full">
              <img className="w-[70%] h-4/5 shadow-xl" src={bookInfo.album} />
            </div>
            <div className="w-1/2  relative">
              <h1 className="pt-2 text-2xl text-[#1b3764]">{bookInfo.name}</h1>
              <span className="block mt-1 text-xl text-[#ffca42] font-bold">
                ￥{bookInfo.price}
              </span>
              <div className="mt-6 line-clamp-6 text-[#969aa0]">{bookInfo.describe}</div>
              <div className="mt-5 text-[#969aa0]">出版社：{bookInfo.publisher}</div>
              <div className="mt-5 text-[#969aa0]">发布时间：{bookInfo.pubtime}</div>
              <div className="absolute flex items-center justify-start bottom-6">
                <input
                  style={{ border: 'solid 2px #ffca42' }}
                  className="h-9 w-16 mr-2  outline-none text-center text-[#969aa0]"
                  type="text"
                  placeholder="1"
                />
                <button className="h-10 w-40 bg-[#ffca42]">加入购物车</button>
              </div>
            </div>
          </div>
        </div>
        {/* 评论 */}
      </div>
    )
  )
}

BookInfo.displayName = 'BookInfo'
export default memo(BookInfo)
