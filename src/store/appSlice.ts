import { createSlice } from '@reduxjs/toolkit'

type App = {
  /** Is the app ready for use */
  isReady: boolean
}

export type InitialState = { value: App }

const initialState: InitialState = {
  value: { isReady: false },
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setReady: state => {
      state.value = { ...state.value, isReady: true }
    },
  },
})

export const { setReady } = appSlice.actions

export default appSlice.reducer
