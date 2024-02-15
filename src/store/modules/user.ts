import { createSlice } from '@reduxjs/toolkit'

interface RecommendState {
  userInfo: Record<any, any>
  curPathName: string
  humberIsOpen: boolean
}
const initialState: RecommendState = {
  userInfo: {},
  curPathName: '',
  humberIsOpen: false
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
    },
    setHumberIsOpen(state, { payload }) {
      state.humberIsOpen = payload
    }
  }
})
export const { setUserInfo, setCurPathName, setHumberIsOpen } = UserSlice.actions
export default UserSlice.reducer
