import { reqBookCommentListById, searchBookDetailById } from '@/service/modules/book'
import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import BookInfo from './BookInfo'
import BookComment from './BookComment'
interface IProps {
  children?: ReactNode
}

const BookDetail: FC<IProps> = (props) => {
  useEffect(() => {
    // window.scrollTo(0, 0)
    fetchBookInfo()
  }, [])
  const location = useLocation()
  const { curBookId } = location.state
  const [curBookInfo, setCurBookInfo] = useState()
  const [curBookCommentList, setCurBookCommentList] = useState<any[]>()
  async function fetchBookInfo() {
    const { bookInfo } = await searchBookDetailById(curBookId)
    setCurBookInfo(bookInfo)
    const { commentList } = await reqBookCommentListById(curBookId)
    setCurBookCommentList(commentList)
  }
  return (
    <div className="h-full">
      {curBookInfo && <BookInfo bookInfo={curBookInfo}></BookInfo>}
      {curBookCommentList && (
        <BookComment
          commentList={curBookCommentList}
          curBookId={curBookId}
          fetchBookInfo={fetchBookInfo}
        ></BookComment>
      )}
    </div>
  )
}

BookDetail.displayName = 'BookDetail'
export default memo(BookDetail)
