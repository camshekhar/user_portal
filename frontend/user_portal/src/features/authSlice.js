import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
}

export const authReducer = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
        state.access_token = action.payload.access_token
    },
    unSetUserToken: (state, action) => {
        state.access_token = action.payload.access_token
    },
    
  },
})


export const { setUserToken, unSetUserToken } = authReducer.actions

export default authReducer.reducer