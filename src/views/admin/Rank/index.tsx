import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import RankHeader from './c-cpns/RankHeader'
import DragTable from './c-cpns/DragTable'
import { Spin } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
interface IProps {
  children?: ReactNode
}

const Rank: FC<IProps> = (props) => {
  const { isSpinning } = useAppSelector(
    (state) => ({
      isSpinning: state.rank.isTableSpinning
    }),
    shallowEqualApp
  )
  return (
    <div className="w-full">
      <div className="fixed top-12 z-10 ">
        <RankHeader />
      </div>
      <div className="mt-9">
        <Spin spinning={isSpinning} size="large">
          <DragTable />
        </Spin>
      </div>
    </div>
  )
}

Rank.displayName = 'Rank'
export default memo(Rank)
