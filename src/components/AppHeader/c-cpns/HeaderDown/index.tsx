import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderDownWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HeaderDown: FC<IProps> = (props) => {
  const [isShowExtra, setIsShowExtra] = useState(false)
  return (
    <HeaderDownWrapper $isShowExtra={isShowExtra}>
      <div className="header-down">
        <div className="header-select">
          <ul onMouseEnter={() => setIsShowExtra(true)} onMouseLeave={() => setIsShowExtra(false)}>
            <li>排行榜</li>
            <li>分类</li>
            <li>购物车</li>
            <li>订单信息</li>
            {/* <li>订单信息</li>
            <li>订单信息</li> */}
          </ul>
        </div>
        <div
          className="header-extra"
          onMouseEnter={() => setIsShowExtra(true)}
          onMouseLeave={() => setIsShowExtra(false)}
        ></div>
      </div>
    </HeaderDownWrapper>
  )
}

HeaderDown.displayName = 'HeaderDown'
export default memo(HeaderDown)
