import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = (props) => {
  const navigate = useNavigate()
  return (
    <div className="w-[99vw] h-[99vh] overflow-hidden relative">
      <div className="absolute left-1/2 top-[40%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-8xl font-bold">404</h1>
        <h1 className="text-6xl font-bold my-3">该页面不存在</h1>
        <span
          onClick={(e) => navigate('/shop')}
          className="text-3xl text-blue-600 hover:text-blue-500 cursor-pointer"
        >
          回到首页
        </span>
      </div>
    </div>
  )
}

NotFound.displayName = 'NotFound'
export default memo(NotFound)
