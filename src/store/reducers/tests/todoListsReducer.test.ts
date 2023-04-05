import {
  TodoListDomainType,
  addTodoListAndTasks,
  removeTodoListAndTasks,
  setTodolistFilter,
  setTodolistStatus,
  setTodolistTitle,
  setTodolists,
  todolistsReducer,
} from '../reducers/todoListsReducer'

const todoLIstId_1 = '87jhg8'
const todoLIstId_2 = '87jhg3'
const startState: TodoListDomainType[] = [
  {
    id: todoLIstId_1,
    title: 'What to learn',
    filter: 'all',
    addDate: '',
    order: 0,
    entityStatus: 'idle',
  },
  {
    id: todoLIstId_2,
    title: 'What to buy',
    filter: 'active',
    addDate: '',
    order: 0,
    entityStatus: 'idle',
  },
]

test('Todolist filter should be changed', () => {
  const filter = 'completed'
  const todolistId = todoLIstId_2
  const endState = todolistsReducer(startState, setTodolistFilter({ todolistId, filter }))
  const updatedTodolist = endState.find((el) => el.id === todolistId)
  expect(updatedTodolist?.filter).toEqual(filter)
})
test('Todolist title should be renamed', () => {
  const title = 'Hola'
  const todolistId = todoLIstId_1

  const endState = todolistsReducer(startState, setTodolistTitle({ todolistId, title }))
  const updatedTodolist = endState.find((el) => el.id === todolistId)
  expect(updatedTodolist?.title).toEqual(title)
})
test('Todolist should be removed', () => {
  const todolistId = todoLIstId_1

  const endState = todolistsReducer(startState, removeTodoListAndTasks({ todolistId }))

  expect(endState.length).toEqual(1)
  expect(endState.some((el) => el.id === todolistId)).toEqual(false)
})
test('Todolists should be set', () => {
  const endState = todolistsReducer([], setTodolists({ todolists: startState }))
  expect(endState.length).toEqual(2)
})
test('New Todolists should be created', () => {
  const newTodolistId = 'wj2389ewhjdkbwn'
  const newTodolist = {
    id: newTodolistId,
    title: 'Lucky',
    filter: 'all',
    addDate: '',
    order: 0,
  }
  const endState = todolistsReducer(startState, addTodoListAndTasks({ todolist: newTodolist }))
  expect(endState.length).toEqual(3)
  expect(endState.some((el) => el.id === newTodolistId)).toEqual(true)
})
test('Todolist status should be set to loading', () => {
  const status = 'loading'
  const endState = todolistsReducer(startState, setTodolistStatus({ todolistId: todoLIstId_1, status }))
  const todoList = endState.find((t) => t.id === todoLIstId_1)
  expect(todoList?.entityStatus).toEqual(status)
})
