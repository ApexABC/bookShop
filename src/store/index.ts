import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux'
import homeReducer from './modules/home'
import adminBook from './modules/adminBook'
import rank from './modules/rank'
import user from './modules/user'
import order from './modules/order'
import chat from './modules/chat'
const store = configureStore({
  reducer: {
    user,
    home: homeReducer,

    adminBook,
    rank,
    order,
    chat
  }
})

// 控制state类型
export type IRootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
// 控制dispatch返回类型
type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch
// shallowequal
export const shallowEqualApp = shallowEqual
export default store
