import io from 'socket.io-client'

class SocketClient {
  private socket
  private _url
  constructor(url: string) {
    this._url = url
    this.socket = io(url)
  }

  reConnectWithInfo(info: Record<string, any>) {
    this.disconnect()
    this.socket = io(this._url, info)
  }

  connect() {
    this.socket.on('connect', () => {
      console.log('连接到服务器socket')
    })
  }

  disconnect() {
    this.socket.disconnect()
  }
  on(eventName: string, callback: (...args: any[]) => void) {
    this.socket.on(eventName, callback)
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }
}

const socketClient = new SocketClient(import.meta.env.VITE_BASE_URL) // 创建一个SocketClient实例

export default socketClient
