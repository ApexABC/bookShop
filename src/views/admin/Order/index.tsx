import { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Select, Table, Button, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { reqAdminOrderList, reqChangeOrderStatus } from '@/service/modules/order'
import { formatUtc } from '@/utils/formatDate'
interface IProps {
  children?: ReactNode
}
const selectOpt = [
  { value: '未发货', label: '未发货' },
  { value: '全部', label: '全部' },
  { value: '已发货', label: '已发货' },
  { value: '已完成', label: '已完成' }
]

const Order: FC<IProps> = (props) => {
  useEffect(() => {
    fetchOrderList()
  }, [])
  function handleSelectChange(val: any, opt: any) {
    setOrderType(val)
    filterOrderByType(totalOrderList, val)
  }
  const [totalOrderList, setTotalCurOrderList] = useState<any[]>([])
  const [curOrderList, setCurOrderList] = useState<any[]>()
  const [orderType, setOrderType] = useState('未发货')
  const columns: ColumnsType<any> = [
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      render(text) {
        return <div>{formatUtc(text)}</div>
      }
    },
    { title: '发货地址', dataIndex: 'address', key: 'address' },
    { title: '总价', dataIndex: 'totalPrice', key: 'totalPrice', width: 120 },
    {
      title: '商品',
      dataIndex: 'boughtList',
      key: 'boughtList',
      ellipsis: true,
      render: (text: any) => {
        return <span>{text.map((item: any) => `${item.name}×${item.totalCount}`).join(',')}</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (text, record) => {
        return <div>{formatStatus(text, record)}</div>
      }
    }
  ]
  function formatStatus(status: number, item: any) {
    if (status === 1)
      return (
        <div>
          {/* <span className="text-sm mr-3">未发货</span> */}
          <Button type="primary" onClick={(e) => handleDeliver(item)}>
            发货
          </Button>
        </div>
      )
    else if (status === 2) return <span className="text-lg text-blue-500">已发货</span>
    else if (status === 3) return <span className="text-lg text-blue-500">已完成</span>
  }
  async function handleDeliver(item: any) {
    const info = {
      id: item.id,
      status: 2
    }
    const { code } = await reqChangeOrderStatus(info)
    if (code === 200) {
      message.success('发货成功')
      fetchOrderList()
    }
  }
  async function fetchOrderList() {
    const { orderList } = await reqAdminOrderList()
    setTotalCurOrderList(orderList)
    filterOrderByType(orderList, orderType)
  }
  function filterOrderByType(list: any[], type: string) {
    if (type === '全部') return setCurOrderList(list)
    else if (type === '未发货') return setCurOrderList(list?.filter((item) => item.status === 1))
    else if (type === '已发货') return setCurOrderList(list?.filter((item) => item.status === 2))
    else if (type === '已完成') return setCurOrderList(list?.filter((item) => item.status === 3))
  }
  return (
    <div className="w-full h-full">
      <header className="mb-2">
        <Select
          defaultValue="未发货"
          style={{ width: 280 }}
          onChange={handleSelectChange}
          options={selectOpt}
        />
      </header>
      <main className="w-full h-full">
        <Table
          columns={columns}
          dataSource={curOrderList?.sort((a: any, b: any) => {
            if (a.createTime > b.createTime) return -1
            else if (a.createTime < b.createTime) return 1
            else return 0
          })}
          rowKey={(item) => item.id}
          pagination={{
            total: curOrderList?.length,
            showTotal: (total) => `共 ${total} 条`,
            defaultPageSize: 10,
            defaultCurrent: 1
          }}
        ></Table>
      </main>
    </div>
  )
}

Order.displayName = 'Order'
export default memo(Order)
