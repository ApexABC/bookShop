import { createSlice } from '@reduxjs/toolkit'

interface RecommendState {
  userInfo: Record<any, any>
  curPathName: string
}
const initialState: RecommendState = {
  userInfo: {},
  curPathName: ''
}
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    setCurPathName(state, { payload }) {
      state.curPathName = payload
    }
  }
})
export const { setUserInfo, setCurPathName } = UserSlice.actions
export default UserSlice.reducer
