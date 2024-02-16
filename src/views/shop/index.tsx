import { memo, Suspense, useEffect, useContext } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import { ShopWrapper } from './style'
import SocketContext from '@/socket/socketContext'
import { useAppDispatch } from '@/store'
import { verifyTokenPass } from '@/utils/verifyToken'
import { setChatList } from '@/store/modules/chat'
interface IProps {
  children?: ReactNode
}

const Shop: FC<IProps> = (props) => {
  const socketClient = useContext(SocketContext)
  const dispatch = useAppDispatch()
  useEffect(() => {
    connectChat()
  }, [])
  async function connectChat() {
    const userInfo = await verifyTokenPass()
    if (!userInfo) return
    socketClient.reConnectWithInfo({
      query: {
        userId: userInfo.id
      }
    })
    // socketClient.connect()
    socketClient.on('initMsg', (info) => {
      // console.log(info)
      dispatch(setChatList(info))
    })
    socketClient.on(String(userInfo.id), (info) => {
      // console.log('返回的', info)
      dispatch(setChatList(info))
    })
  }
  return (
    <ShopWrapper>
      <AppHeader></AppHeader>
      <div className="mt-20">
        <Suspense fallback="">
          <Outlet></Outlet>
        </Suspense>
      </div>
    </ShopWrapper>
  )
}

Shop.displayName = 'Shop'
export default memo(Shop)
