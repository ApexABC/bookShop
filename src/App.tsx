import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

import AuthRoute from './router/AuthRoute'

function App() {
  AuthRoute()

  return (
    <div className="App">
      <Suspense fallback="loading...">{useRoutes(routes)}</Suspense>
    </div>
  )
}

export default App
