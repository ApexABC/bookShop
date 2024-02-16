import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { DragSortTable } from '@ant-design/pro-components'
import { Image, message } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
import { reqUpdateRank } from '@/service/modules/rank'

interface IProps {
  children?: ReactNode
}

const columns: any[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible'
  },
  {
    title: '排名',
    render: (_: any, __: any, index: any) => `${index + 1}`,
    width: 60
  },
  { title: '书籍名称', dataIndex: 'name', key: 'name', width: 100 },
  { title: '作者', dataIndex: 'author', key: 'author', width: 100 },
  {
    title: '封面',
    dataIndex: 'album',
    key: 'album',
    width: 100,
    render: (info: any) => <Image width={80} src={info} />
  },
  { title: '发布时间', dataIndex: 'pubtime', key: 'pubtime', width: 150 },
  { title: '评分', dataIndex: 'rate', key: 'rate', width: 80 },
  { title: '价格', dataIndex: 'price', key: 'price', width: 80 },
  { title: '发行商', dataIndex: 'publisher', key: 'publisher', width: 100 },
  { title: '描述', dataIndex: 'describe', key: 'describe', ellipsis: true }
]
const DragTable: FC<IProps> = (props) => {
  const { curRankInfo, rankedBookList } = useAppSelector(
    (state) => ({
      curRankInfo: state.rank.curRankInfo,
      rankedBookList: state.rank.rankedBookList
    }),
    shallowEqualApp
  )
  useEffect(() => {
    setDataSource(rankedBookList)
  }, [rankedBookList])
  const [dataSource, setDataSource] = useState<any>()
  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    setDataSource(newDataSource)
    const rank = newDataSource.map((item: any) => item.id).join(',')
    const info = { ...curRankInfo }
    info.rank = rank
    const { code } = await reqUpdateRank(info)
    if (code === 201) {
      message.success('修改列表排序成功')
    } else {
      message.warning('修改列表排序失败，请重试')
    }
  }
  return (
    <DragSortTable
      // headerTitle="拖拽排序榜单"
      columns={columns}
      rowKey="id"
      pagination={false}
      dataSource={dataSource}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
    />
  )
}

DragTable.displayName = 'DragTable'
export default memo(DragTable)
