import { TodoListDomainType, removeTodoListAndTasks, setTodolistFilter, setTodolistStatus, setTodolistTitle, todolistsReducer } from '../reducers/todoListsReducer'

test('Todolist Reducer', () => {
  const todoLIstId_1 = '87jhg8'
  const todoLIstId_2 = '87jhg3'
  const startState: TodoListDomainType[] = [
    { id: todoLIstId_1, title: 'What to learn', filter: 'all', addDate: '', order: 0, entityStatus: 'idle' },
    { id: todoLIstId_2, title: 'What to buy', filter: 'active', addDate: '', order: 0, entityStatus: 'idle' },
  ]

  const title = 'Hola'
  const filter = 'completed'
  const status = 'loading'

  const removeTodoLIstEndState = todolistsReducer(startState, removeTodoListAndTasks({ todolistId: todoLIstId_2 }))
  const renameTodoLIstEndState = todolistsReducer(startState, setTodolistTitle({ todolistId: todoLIstId_1, title }))
  const setTodoLIstFilterEndState = todolistsReducer(startState, setTodolistFilter({ todolistId: todoLIstId_2, filter }))
  const setTodoLIstStatusEndState = todolistsReducer(startState, setTodolistStatus({ todolistId: todoLIstId_2, status }))

  expect(removeTodoLIstEndState.length).toEqual(1)
  expect(removeTodoLIstEndState.some((el) => el.id === todoLIstId_2)).toEqual(false)

  const filterToCheck = setTodoLIstFilterEndState.find((el) => el.id === todoLIstId_2)?.filter
  const statusToCheck = setTodoLIstStatusEndState.find((el) => el.id === todoLIstId_2)?.entityStatus
  expect(filterToCheck).toEqual(filter)
  expect(statusToCheck).toEqual(status)

  expect(renameTodoLIstEndState.some((el) => el.title === title)).toEqual(true)

  // expect(setTodoLIstFilterEndState.find((el) => el.id === todoLIstId_2)!.filter).toEqual(filterValue)
})
