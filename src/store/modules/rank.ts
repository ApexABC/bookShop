import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reqBookList } from '@/service/modules/book'
import { IRootState } from '..'
export const getRankedBookList = createAsyncThunk(
  'getRankedBook',
  (arg: any, { dispatch, getState }) => {
    const { rank } = getState() as IRootState
    const tar = rank.curRankInfo.rank.split(',').map((item: string) => Number(item))
    reqBookList(1000).then((res) => {
      const bookList = res.data.bookList
      bookList.sort((a: any, b: any) => tar.indexOf(a.id) - tar.indexOf(b.id))
      dispatch(setRankedBookList(bookList))
      dispatch(setTableSpinningState(false))
    })
  }
)

interface IState {
  curRankInfo: Record<any, any>
  rankedBookList: any[]
  isTableSpinning: boolean
}
const initialState: IState = {
  curRankInfo: {},
  rankedBookList: [],
  isTableSpinning: false
}

const rankSlice = createSlice({
  name: 'rankStore',
  initialState,
  reducers: {
    setRankInfo(state, { payload }) {
      state.curRankInfo = payload
    },
    setRankedBookList(state, { payload }) {
      state.rankedBookList = payload
    },
    setTableSpinningState(state, { payload }) {
      state.isTableSpinning = payload
    }
  }
})
export const { setRankInfo, setRankedBookList, setTableSpinningState } = rankSlice.actions
export default rankSlice.reducer
