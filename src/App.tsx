import { useState, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Suspense fallback="loading...">{useRoutes(routes)}</Suspense>
    </div>
  )
}

export default App
