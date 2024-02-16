import { createSlice } from '@reduxjs/toolkit'

interface RecommendState {
  bookList: any[]
}
const initialState: RecommendState = {
  bookList: []
}
const homeSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    bookList(state, { payload }) {
      state.bookList = payload
    }
  }
})
export const { bookList } = homeSlice.actions
export default homeSlice.reducer
