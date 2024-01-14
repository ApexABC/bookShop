import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HomeWrapper } from './style'
import RankItem from '@/components/RankItem'
import rankList from '@/assets/data/rank.json'
import { reqSortList } from '@/service/modules/sort'
import SortItem from '@/components/SortItem'
import { searchRandomBook } from '@/service/modules/book'
import BookItem from '@/components/BookItem'
import { useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = (props) => {
  useEffect(() => {
    getList()
  }, [])
  const [sortList, setSortList] = useState<any[]>()
  const [bookList, setBookList] = useState<any[]>()
  async function getList() {
    const sort = await reqSortList()
    setSortList(sort.data)
    const recommend = await searchRandomBook()
    setBookList(recommend.data.bookList)
  }
  const navigate = useNavigate()
  return (
    <HomeWrapper>
      <h1 className="text-xl font-bold mb-3">图书分类</h1>
      <div className="grid gap-x-1 gap-y-1 grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {sortList?.map((item) => <SortItem itemData={item} key={item.id}></SortItem>)}
      </div>
      <h1 className="text-xl font-bold my-3">书籍排行榜</h1>
      <div className="grid gap-x-2 gap-y-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {rankList.map((item) => (
          <RankItem itemData={item} key={item.id}></RankItem>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold my-3">推荐书籍</h1>
        <span
          className="cursor-pointer"
          onClick={(e) => navigate('/shop/bookList', { state: { title: '推荐书籍' } })}
        >
          查看更多
        </span>
      </div>
      <div className="grid gap-x-2 gap-y-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bookList?.map((item) => <BookItem itemData={item} key={item.id}></BookItem>)}
      </div>
    </HomeWrapper>
  )
}

Home.displayName = 'Home'
export default memo(Home)
