import { TaskPriorities, TasksStatuses, TaskType, todolistsApi, UpdateTaskServerModelType } from '../../../api'
import { handleNetworkError, handleServerError } from '../../../utils/handleError'
import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { setAppStatus } from '../../../app/appReducer'
import { StateType } from '../../store'
import { addTodoListAndTasks, removeTodoListAndTasks, setTodolists } from './todoListsReducer'

export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type UpdateTaskLocalModelType = {
  title?: string
  description?: string
  status?: TasksStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
const initialState: TasksStateType = {}
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ todolistId: string; task: TaskType }>) {
      state[action.payload.todolistId].unshift(action.payload.task)
    },
    setTasks(state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskLocalModelType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((el) => el.id === action.payload.taskId)
      tasks[index] = { ...tasks[index], ...action.payload.model }
    },
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((el) => el.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
  },
  extraReducers: (builder) => {
    // Add empty array when todolist was created
    builder.addCase(addTodoListAndTasks, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    // Delete tasks when for correspond todolist
    builder.addCase(removeTodoListAndTasks, (state, action) => {
      delete state[action.payload.todolistId]
    })
    // Add empty arrays for every todolist
    builder.addCase(setTodolists, (state, action) => {
      action.payload.todolists.forEach((el) => {
        state[el.id] = []
      })
    })
  },
})

export const tasksReducer = slice.reducer
export const { addTask, removeTask, setTasks, updateTask } = slice.actions

export const fetchTasks = (todolistId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await todolistsApi.getTasks(todolistId)
      dispatch(setTasks({ todolistId, tasks: data.items }))
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const deleteTask = (todolistId: string, taskId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await todolistsApi.deleteTask(todolistId, taskId)
      if (data.resultCode === 0) {
        dispatch(removeTask({ todolistId, taskId }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
export const createTask = (todolistId: string, taskTitle: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await todolistsApi.createTask(todolistId, taskTitle)
      if (data.resultCode === 0) {
        dispatch(addTask({ todolistId, task: data.data.item }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}

export const updateTaskTC = (todolistId: string, taskId: string, localModel: UpdateTaskLocalModelType) => {
  return async (dispatch: Dispatch, getState: () => StateType) => {
    try {
      const state = getState()
      const task = state.tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        console.warn('Task not found')
        return
      }
      const apiModel: UpdateTaskServerModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...localModel,
      }
      const data = await todolistsApi.updateTask(todolistId, taskId, apiModel)
      if (data.resultCode === 0) {
        dispatch(updateTask({ todolistId, taskId, model: apiModel }))
      } else {
        handleServerError(data, dispatch)
      }
    } catch (err) {
      handleNetworkError(err as AxiosError, dispatch)
    }
  }
}
