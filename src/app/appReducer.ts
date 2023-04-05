import { AxiosError } from 'axios'
import { authAPI } from '../api'
import { handleNetworkError, handleServerError } from '../utils/handleError'
import { setIsLoggedIn } from '../store/reducers/reducers/authReducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error: string
  isInitialized: boolean
}
const initialState: AppStateType = {
  status: 'idle',
  error: '',
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    },
    setAppError(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppIsInitialized, setAppError } = slice.actions

export const initializeApp = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authAPI.auth()
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({ value: true }))
      } else {
        handleServerError(data, dispatch)
        dispatch(setAppStatus({ status: 'failed' }))
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
    dispatch(setAppIsInitialized({ value: true }))
  }
}
