import { createSlice } from '@reduxjs/toolkit'

interface OrderState {
  cartList: []
  cartCount: number
}
const initialState: OrderState = {
  cartList: [],
  cartCount: 0
}
const orderSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    setCartList(state, { payload }) {
      state.cartList = payload
    },
    setCartCount(state, { payload }) {
      state.cartCount = payload
    }
  }
})
export const { setCartList, setCartCount } = orderSlice.actions
export default orderSlice.reducer
