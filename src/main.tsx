import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { ConfigProvider } from 'antd'
import store from './store/index.ts'
import App from './App.tsx'
import '@/assets/css/index.less'
import 'virtual:svg-icons-register'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <ConfigProvider theme={undefined}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ConfigProvider> */}
  </Provider>
  // </React.StrictMode>
)
