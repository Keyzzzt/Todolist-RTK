import { Dispatch } from 'redux'
import { ServerResponseType } from '../api'
import { AxiosError } from 'axios'
import { setAppError, setAppStatus } from '../app/appReducer'

export const handleServerError = <D>(data: ServerResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Server error' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
export const handleNetworkError = (error: AxiosError, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message ? error.message : 'Network error' }))
  dispatch(setAppStatus({ status: 'failed' }))
}
