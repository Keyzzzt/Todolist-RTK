import { todolistsApi, TodolistType } from '../../../api'
import { RequestStatusType, setAppStatus } from '../../../app/appReducer'
import { handleNetworkError } from '../../../utils/handleError'
import { handleServerError } from './../../../utils/handleError'
import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodoListDomainType[] = []

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }))
    },
    setTodolistFilter(state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    setTodolistStatus(state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.status
    },
    setTodolistTitle(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      state[index].title = action.payload.title
    },
    removeTodoListAndTasks(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((el) => el.id === action.payload.todolistId)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodoListAndTasks(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
  },
})

export const todolistsReducer = slice.reducer
export const { setTodolists, addTodoListAndTasks, setTodolistStatus, removeTodoListAndTasks, setTodolistTitle, setTodolistFilter } = slice.actions

export const fetchTodolists = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const todolists = await todolistsApi.getTodolists()
      dispatch(setTodolists({ todolists }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const createTodolist = (title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const data = await todolistsApi.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(addTodoListAndTasks({ todolist: data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const deleteTodolist = (todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      dispatch(setTodolistStatus({ todolistId, status: 'loading' }))
      const data = await todolistsApi.deleteTodolist(todolistId)
      if (data.resultCode === 0) {
        dispatch(removeTodoListAndTasks({ todolistId }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const changeTodolistTitle = (todolistId: string, title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      dispatch(setTodolistStatus({ todolistId, status: 'loading' }))
      const data = await todolistsApi.updateTodolist(todolistId, title)
      if (data.resultCode === 0) {
        dispatch(setTodolistTitle({ todolistId, title }))
        dispatch(setTodolistStatus({ todolistId, status: 'idle' }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
