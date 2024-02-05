import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
const Shop = lazy(() => import('@/views/shop'))
const Home = lazy(() => import('@/views/shop/Home'))
const BookList = lazy(() => import('@/views/shop/BookList'))
const RankList = lazy(() => import('@/views/shop/RankList'))
const Login = lazy(() => import('@/views/shop/Login'))
const BookDetail = lazy(() => import('@/views/shop/BookDetail'))
const ShopCar = lazy(() => import('@/views/shop/ShopCar'))
const Order = lazy(() => import('@/views/shop/Order'))
const SubOrder = lazy(() => import('@/views/shop/SubOrder'))
const BoughtSuccess = lazy(() => import('@/views/shop/BoughtSuccess'))

const Admin = lazy(() => import('@/views/admin'))
const Book = lazy(() => import('@/views/admin/Book'))
const Rank = lazy(() => import('@/views/admin/Rank'))
const Sort = lazy(() => import('@/views/admin/Sort'))
const OrderAdmin = lazy(() => import('@/views/admin/Order'))
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
      { path: '/shop/rankList', element: <RankList /> },
      { path: '/shop/bookDetail', element: <BookDetail /> },
      { path: '/shop/car', element: <ShopCar /> },
      { path: '/shop/order', element: <Order /> },
      { path: '/shop/subOrder', element: <SubOrder /> },
      { path: '/shop/boughtSuccess', element: <BoughtSuccess /> }
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
      { path: '/admin/order', element: <OrderAdmin /> },
      { path: '/admin/book', element: <Book /> },
      { path: '/admin/rank', element: <Rank /> },
      { path: '/admin/sort', element: <Sort /> }
    ]
  }
]
export default routes
