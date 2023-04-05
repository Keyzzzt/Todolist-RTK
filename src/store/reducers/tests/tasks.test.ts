import { addTask, removeTask, setTasks, tasksReducer, updateTask } from '../reducers/tasksReducer'
import { TaskPriorities, TasksStatuses } from '../../../api'

const todolistId_1 = '87jhg8'
const todolistId_2 = '87jhg3'
const tasks = [
  {
    id: '1p',
    title: 'Toyota oil',
    status: TasksStatuses.New,
    addedDate: '',
    deadline: '',
    order: 0,
    startDate: '',
    todoListId: '1',
    description: '',
    priority: TaskPriorities.Later,
  },
  {
    id: 'o0l',
    title: 'Glass cans',
    status: TasksStatuses.Completed,
    addedDate: '',
    deadline: '',
    order: 0,
    startDate: '',
    todoListId: '1',
    description: '',
    priority: TaskPriorities.Hi,
  },
]
const startState = {
  [todolistId_1]: [],
  [todolistId_2]: tasks,
}

test('Should create new task', () => {
  const task = {
    id: 'o220l',
    title: 'Glass cans',
    status: TasksStatuses.Completed,
    addedDate: '',
    deadline: '',
    order: 0,
    startDate: '',
    todoListId: '1',
    description: '',
    priority: TaskPriorities.Hi,
  }
  const endState = tasksReducer(startState, addTask({ todolistId: todolistId_1, task }))
  expect(endState[todolistId_1].length).toEqual(1)
})

test('Should set tasks to the corresponds todolist', () => {
  const endState = tasksReducer(startState, setTasks({ todolistId: todolistId_1, tasks }))
  expect(endState[todolistId_1].length).toEqual(2)
})
test('Should remove task from todolist', () => {
  const taskId = tasks[0].id
  const taskIdThatShouldNotBeRemoved = tasks[1].id
  const endState = tasksReducer(startState, removeTask({ todolistId: todolistId_2, taskId }))
  expect(endState[todolistId_2].length).toEqual(1)
  expect(endState[todolistId_2].find((el) => el.id === taskId)).toBeUndefined()
  expect(endState[todolistId_2].some((el) => el.id === taskIdThatShouldNotBeRemoved)).toEqual(true)
})
test('Should update task title', () => {
  // Доделать тестЫ на - status
  const title = 'Washington'
  const taskId = tasks[1].id
  const taskToUpdate = {
    title,
    status: TasksStatuses.Completed,
    addedDate: '',
    deadline: '',
    order: 0,
    startDate: '',
    todoListId: '1',
    description: '',
    priority: TaskPriorities.Hi,
  }
  const endState = tasksReducer(startState, updateTask({ todolistId: todolistId_2, taskId, model: taskToUpdate }))

  const updatedTask = endState[todolistId_2].find((el) => el.id === taskId)
  expect(updatedTask?.title).toEqual(title)
})
