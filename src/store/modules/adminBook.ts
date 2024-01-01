import { reqBookList } from '@/service/modules/book'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const fetchAdminBookAction = createAsyncThunk('adminBook', (arg: any, { dispatch }) => {
  reqBookList(arg.limit, arg.offset).then((res) => {
    dispatch(getBookList(res.data))
  })
})
interface RecommendState {
  bookInfo: any
}
const initialState: RecommendState = {
  bookInfo: {}
}
const homeSlice = createSlice({
  name: 'adminBook',
  initialState,
  reducers: {
    getBookList(state, { payload }) {
      state.bookInfo = payload
    }
  }
})
export const { getBookList } = homeSlice.actions
export default homeSlice.reducer
