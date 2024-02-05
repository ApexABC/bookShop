import Svg from '@/components/Svg'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const BoughtSuccess: FC<IProps> = (props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh]">
      <h1 className="text-5xl font-bold text-rose-400 mb-5">支付成功</h1>
      <span
        onClick={(e) => navigate('/shop/order')}
        className="flex items-center text-2xl cursor-pointer hover:text-blue-500 bg-transparent"
      >
        查看订单 <Svg name="更多" size={26}></Svg>
      </span>
    </div>
  )
}

BoughtSuccess.displayName = 'BoughtSuccess'
export default memo(BoughtSuccess)
