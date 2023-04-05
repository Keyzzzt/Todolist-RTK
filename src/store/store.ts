import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from './reducers/reducers/tasksReducer'
import { todolistsReducer } from './reducers/reducers/todoListsReducer'
import { appReducer } from '../app/appReducer'
import { authReducer } from './reducers/reducers/authReducer'

import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todolistsReducer,
  tasks: tasksReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(thunk)
  },
})

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type StateType = ReturnType<typeof rootReducer>
