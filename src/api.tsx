import axios, { AxiosError } from 'axios'
import { LoginParamsType } from './store/reducers/reducers/authReducer'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '71e6e901-cd3a-49fe-a2c6-dffd513be2ad',
  },
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
})

export type ServerError = {
  resultCode: 1
  messages: string[]
  data: {}
}
export type TodolistType = {
  id: string
  title: string
  addDate: string
  order: number
}
export enum TasksStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TasksStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  addedDate: string
}
type CreateTodolistDataType = {
  item: TodolistType
}
type CreateAndUpdateTaskType = {
  item: TaskType
}
export type ServerResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}
type LoginResponseType = {
  userId?: number
}
type AuthResponseType = {
  id: number
  email: string
  login: string
}
type GetTasksResponse = {
  totalCount: number
  error: null | string
  items: TaskType[]
}
export type UpdateTaskServerModelType = {
  title: string
  description: string
  status: TasksStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`).then((res) => res.data)
  },
  createTodolist(title: string) {
    return instance.post<ServerResponseType<CreateTodolistDataType>>(`todo-lists`, { title }).then((res) => res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ServerResponseType>(`todo-lists/${todolistId}`).then((res) => res.data)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ServerResponseType>(`todo-lists/${todolistId}`, { title }).then((res) => res.data)
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`).then((res) => res.data)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ServerResponseType<CreateAndUpdateTaskType>>(`todo-lists/${todolistId}/tasks`, { title }).then((res) => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ServerResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`).then((res) => res.data)
  },
  updateTask(todolistId: string, taskId: string, updateData: UpdateTaskServerModelType) {
    return instance.put<ServerResponseType<CreateAndUpdateTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, { ...updateData }).then((res) => res.data)
  },
}
export const authAPI = {
  login(params: LoginParamsType) {
    return instance.post<ServerResponseType<LoginResponseType>>(`auth/login`, { ...params }).then((res) => res.data)
  },
  logout() {
    return instance.delete<ServerResponseType<LoginResponseType>>(`auth/login`).then((res) => res.data)
  },
  auth() {
    return instance.get<ServerResponseType<AuthResponseType>>(`auth/me`).then((res) => res.data)
  },
}
