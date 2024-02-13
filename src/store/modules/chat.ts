import { createSlice } from '@reduxjs/toolkit'

interface IState {
  chatList: any[]
}
const initialState: IState = {
  chatList: []
}
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList(state, { payload }) {
      state.chatList = payload
    }
  }
})
export const { setChatList } = chatSlice.actions
export default chatSlice.reducer
