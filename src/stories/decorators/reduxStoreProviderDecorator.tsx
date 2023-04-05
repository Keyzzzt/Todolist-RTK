import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from '../../app/appReducer'
import { tasksReducer } from '../../store/reducers/reducers/tasksReducer'
import { todolistsReducer } from '../../store/reducers/reducers/todoListsReducer'
import { v1 } from 'uuid'
import { TaskPriorities, TasksStatuses } from '../../api'
import { authReducer } from '../../store/reducers/reducers/authReducer'

const rootReducer = combineReducers({
  app: appReducer,
  todos: todolistsReducer,
  tasks: tasksReducer,
  auth: authReducer,
})
const id1 = v1()
const id2 = v1()

const initialGlobalState: StateType = {
  app: { status: 'idle', error: '', isInitialized: false },
  todos: [
    { id: id1, title: 'New Todo', filter: 'all', entityStatus: 'idle', addDate: '', order: 0 },
    { id: id2, title: 'Old Todo', filter: 'all', entityStatus: 'loading', addDate: '', order: 0 },
  ],
  tasks: {
    [id1]: [
      {
        id: v1(),
        title: 'Classes',
        status: TasksStatuses.New,
        todoListId: id1,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'Finnish Incubator',
        status: TasksStatuses.New,
        todoListId: id1,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      { id: v1(), title: 'RTK', status: TasksStatuses.New, todoListId: id1, description: '', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low },
    ],
    [id2]: [
      {
        id: v1(),
        title: 'Classes',
        status: TasksStatuses.New,
        todoListId: id2,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: 'Finnish Incubator',
        status: TasksStatuses.New,
        todoListId: id2,
        description: '',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      { id: v1(), title: 'RTK', status: TasksStatuses.New, todoListId: id2, description: '', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low },
    ],
  },
  auth: {
    isLoggedIn: false,
  },
}

export const storybookStore = createStore(rootReducer, initialGlobalState as StateType, applyMiddleware(thunk))
export type StateType = ReturnType<typeof rootReducer>

export const reduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
