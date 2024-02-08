import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Card, Col, Row, Statistic } from 'antd'
import ECharts from '@/components/ECharts'
import saleValChartsOption from './saleValChartsOption'
import bookTypeChartsOption from './bookTypeChartsOption'
import { reqBaseData, reqTipsData } from '@/service/modules/dashBoard'
import { formatUtc } from '@/utils/formatDate'
import CountUp from 'react-countup'

interface IProps {
  children?: ReactNode
}
const saleValOption = saleValChartsOption()
const bookTypeOption = bookTypeChartsOption()
const DashBoard: FC<IProps> = (props) => {
  useEffect(() => {
    fetchData()
  }, [])
  const [curBaseData, setCurBaseData] = useState<Record<string, any>>({})
  const [curOrderTips, setCurOrderTips] = useState<any[]>([])
  const [curInventoryTips, setCurInventoryTips] = useState<any[]>([])
  async function fetchData() {
    const { baseData } = await reqBaseData()
    setCurBaseData(baseData)
    const { tipsData } = await reqTipsData()
    setCurOrderTips(tipsData.orderResult)
    setCurInventoryTips(tipsData.inventoryResult)
  }
  return (
    <div className="w-full h-full pb-2 overflow-x-hidden">
      <header className="w-full">
        <Row gutter={24}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="总销售额"
                value={curBaseData.totalPrice}
                precision={2}
                formatter={(val: any) => (
                  <span className="font-bold text-orange-500 text-3xl">
                    <span className="font-normal">￥</span>
                    <CountUp end={val} />
                  </span>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="总销量"
                value={curBaseData.totalCount}
                formatter={(val: any) => (
                  <span className="flex items-center font-bold text-3xl text-blue-500">
                    <CountUp end={val} />
                    <span className="text-2xl ml-1">本</span>
                  </span>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="总用户数"
                value={curBaseData.userNum}
                formatter={(val: any) => (
                  <span className="flex items-center font-bold text-3xl text-purple-500">
                    <CountUp end={val} />
                    <span className="text-2xl  ml-1">名</span>
                  </span>
                )}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="现书籍数(种数)"
                value={curBaseData.bookNum}
                formatter={(val: any) => (
                  <span className="flex items-center font-bold text-3xl text-pink-500">
                    <CountUp end={val} />
                    <span className="text-2xl  ml-1">本</span>
                  </span>
                )}
              />
            </Card>
          </Col>
        </Row>
      </header>
      <div className="grid grid-cols-5 gap-x-3 mt-2">
        <div className="bg-white col-span-3 h-[300px] rounded-lg shadow-md">
          <ECharts name="bar" option={saleValOption} height={300}></ECharts>
        </div>
        <div className="bg-white col-span-2 h-[300px] rounded-lg shadow-md">
          <ECharts name="pie" option={bookTypeOption} height={300}></ECharts>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 w-full h-80 mt-2 rounded-lg shadow-md">
        <div className=" px-5 pt-3 bg-white rounded-md shadow-md">
          <h1 className="text-base font-bold text-gray-600 ">发货提醒</h1>
          <div className="h-80 mt-2 overflow-y-scroll">
            {curOrderTips.map((item) => (
              <div key={item.id} className="py-2 w-full truncate font-bold">
                下单时间：<span className="text-gray-500">{formatUtc(item.createTime)} </span>
                <span className="ml-2 font-bold">
                  地址：<span className="text-gray-500">{item.address}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" px-5 pt-3 bg-white rounded-md shadow-md">
          <h1 className="text-base font-bold text-gray-600">库存提醒</h1>
          <div className="h-80 mt-2 overflow-y-scroll">
            {curInventoryTips.map((item) => (
              <div key={item.id} className="flex py-2 w-full font-bold">
                <div className="w-[60%] truncate">
                  <span className="font-bold">书名：</span>
                  <span className="text-gray-500 ">{item.name}</span>
                </div>
                <div className="w-[40%]">
                  <span className="font-bold">库存:</span>
                  <span className="ml-2 text-gray-500 ">{item.inventory}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

DashBoard.displayName = 'DashBoard'
export default memo(DashBoard)
