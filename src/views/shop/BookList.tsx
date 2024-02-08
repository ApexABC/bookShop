import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { searchBookListBySortId, searchRandomBook } from '@/service/modules/book'
import BookItem from '@/components/BookItem'
// import AppFooter from '@/components/AppFooter'
interface IProps {
  children?: ReactNode
}

const BookList: FC<IProps> = (props) => {
  const location = useLocation()
  const { title, sortId } = location.state

  useEffect(() => {
    if (sortId) {
      // 如果是分类
      getBookListBySort(sortId)
    } else {
      getRecommendList()
    }
  }, [])
  async function getRecommendList() {
    const recommend = await searchRandomBook(100)
    setBookList(recommend.data.bookList)
  }
  async function getBookListBySort(id: number) {
    const res = await searchBookListBySortId(id)
    setBookList(res.data.bookList)
  }
  const [bookList, setBookList] = useState<any[]>()
  return (
    <div className="p-4 px-5">
      <h1 className="text-xl font-bold mb-3">{title}</h1>
      <div className="mb-2 grid gap-x-2 gap-y-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bookList?.map((item) => <BookItem itemData={item} key={item.id}></BookItem>)}
      </div>
      {/* <AppFooter></AppFooter> */}
    </div>
  )
}

BookList.displayName = 'BookList'
export default memo(BookList)
