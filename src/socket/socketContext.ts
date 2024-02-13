import { createContext } from 'react'
import socketClient from './index'

const SocketContext = createContext(socketClient)

export default SocketContext
