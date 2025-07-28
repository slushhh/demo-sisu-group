import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    appSlice,
    userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
