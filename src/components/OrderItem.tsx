import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Svg from './Svg'
import { reqCartCount } from '@/service/modules/order'
import { message } from 'antd'

interface IProps {
  children?: ReactNode
  itemData: Record<string, any>
  fetchCartList?: () => void
  orderStatus?: boolean
}

const OrderItem: FC<IProps> = ({ itemData, fetchCartList, orderStatus = false }) => {
  // function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   console.log(e.target.value)
  // }
  async function SvgChange(item: any, type: string) {
    let code
    if (type === '加') {
      const res = await reqCartCount(item.id, item.count + 1)
      code = res.code
    } else {
      if (item.count === 1) return
      const res = await reqCartCount(item.id, item.count - 1)
      code = res.code
    }
    if (code === 201) {
      message.success('修改成功')
      fetchCartList!()
    } else {
      message.warning('修改失败，请检查')
    }
  }
  return (
    <div className="flex items-center h-30 px-3 ">
      <div className="flex items-center w-20 h-32 mr-2">
        <img className="w-20 h-[90%]" src={itemData.album} />
      </div>
      <div className="flex-1 flex flex-col justify-start">
        <h1 className="font-bold mb-2 -translate-y-3 line-clamp-1">{itemData.name}</h1>
        <span className="text-gray-500 mb-2 line-clamp-1">{itemData.author}</span>
        <span className="text-gray-500 text-sm">余量：{itemData.inventory}本</span>
      </div>
      <div className="flex flex-col items-center justify-center w-30 h-full py-3 -translate-y-3">
        <div className="font-bold mb-3 text-orange-500">￥{itemData.price}</div>
        <div className="flex items-center">
          {orderStatus ? (
            <div>×{itemData.count}</div>
          ) : (
            <div className="flex items-center h-7 bg-white rounded-md border-2 border-solid border-[#dee2e7]">
              <div className="cursor-pointer" onClick={(e) => SvgChange(itemData, '减')}>
                <Svg name="减号" color="#8b96a5"></Svg>
              </div>
              <span
                style={{ borderLeft: '2px solid #dee2e7', borderRight: '2px solid #dee2e7' }}
                className="flex items-center justify-center text-sm select-none w-10 h-full box-border border-[#dee2e7]"
              >
                {itemData.count}
              </span>
              <div className="cursor-pointer" onClick={(e) => SvgChange(itemData, '加')}>
                <Svg name="加号" color="#8b96a5"></Svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

OrderItem.displayName = 'OrderItem'
export default memo(OrderItem)
