import { createSlice } from '@reduxjs/toolkit'

interface RecommendState {
  userInfo: Record<any, any>
}
const initialState: RecommendState = {
  userInfo: {}
}
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    }
  }
})
export const { setUserInfo } = UserSlice.actions
export default UserSlice.reducer
