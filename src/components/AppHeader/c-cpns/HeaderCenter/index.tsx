import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderCenterWrapper } from './style'
import Svg from '@/components/Svg'
interface IProps {
  children?: ReactNode
}
const HeaderCenter: FC<IProps> = (props) => {
  return (
    <HeaderCenterWrapper>
      <div className="header-search">
        <input type="text" placeholder="查询书籍" />
        <div className="btn">
          <Svg name="search" size={22} color={'#fff'}></Svg>
          <button>搜索</button>
        </div>
      </div>
    </HeaderCenterWrapper>
  )
}

HeaderCenter.displayName = 'HeaderCenter'
export default memo(HeaderCenter)
