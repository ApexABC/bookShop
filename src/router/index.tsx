import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
const Shop = lazy(() => import('@/views/shop'))
const Home = lazy(() => import('@/views/shop/Home'))
const BookList = lazy(() => import('@/views/shop/BookList'))
const RankList = lazy(() => import('@/views/shop/RankList'))
const Login = lazy(() => import('@/views/shop/Login'))
const ShopCar = lazy(() => import('@/views/shop/ShopCar'))

const Admin = lazy(() => import('@/views/admin'))
const Book = lazy(() => import('@/views/admin/Book'))
const Rank = lazy(() => import('@/views/admin/Rank'))
const Sort = lazy(() => import('@/views/admin/Sort'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/shop/home'} />
  },
  {
    path: '/shop',
    element: <Shop />,
    children: [
      { path: '/shop', element: <Navigate to={'/shop/home'} /> },
      { path: '/shop/home', element: <Home /> },
      { path: '/shop/bookList', element: <BookList /> },
      { path: '/shop/rankList', element: <RankList /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      { path: '/admin', element: <Navigate to={'/admin/book'} /> },
      { path: '/admin/order', element: <Sort /> },
      { path: '/admin/book', element: <Book /> },
      { path: '/admin/rank', element: <Rank /> },
      { path: '/admin/sort', element: <Sort /> }
    ]
  }
]
export default routes
