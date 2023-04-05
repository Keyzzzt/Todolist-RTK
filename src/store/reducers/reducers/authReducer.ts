import { authAPI } from '../../../api'
import { handleNetworkError } from '../../../utils/handleError'
import { handleServerError } from '../../../utils/handleError'
import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { setAppStatus } from '../../../app/appReducer'

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captha?: string
}

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

export const login = (params: LoginParamsType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const data = await authAPI.login(params)
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({ value: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(data, dispatch)
        dispatch(setAppStatus({ status: 'failed' }))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(setIsLoggedIn({ value: false }))
      } else {
        handleServerError(data, dispatch)
        dispatch(setAppStatus({ status: 'failed' }))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
