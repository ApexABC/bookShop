import { useState, Suspense } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './router'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <div>bookshop</div>
      <NavLink to={'/shop'}>changehome</NavLink>
      <NavLink to={'/admin'}>changeRouter</NavLink>
      <Suspense fallback="loading...">
        <div>{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
