import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types'

export type InitialState = {
  value: User
}

const initialState: InitialState = {
  value: {
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    createDateUtc: 0,
    updateDateUtc: 0,
  },
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = { ...action.payload }
    },

    resetUser: state => {
      state.value = {} as User
    },
  },
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
