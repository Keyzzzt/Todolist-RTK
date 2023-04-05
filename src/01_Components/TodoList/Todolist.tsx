import { memo, useCallback, useEffect, FC } from 'react'
import s from './todolist.module.css'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Button, List } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { FilterValuesType, TodoListDomainType } from '../../store/reducers/reducers/todoListsReducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { Task } from '../Task/Task'
import { TasksStatuses, TaskType } from '../../api'
import { fetchTasks } from '../../store/reducers/reducers/tasksReducer'
import { useDispatch } from 'react-redux'

type PropsType = {
  todoList: TodoListDomainType
  tasks: TaskType[]
  addTask: (taskId: string, title: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodoListFilter: (nextFilterValue: FilterValuesType, removeTodoList: string) => void
  changeTodoListTitle: (newTitle: string, todoListId: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, status: TasksStatuses) => void
  changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
  removeTask: (id: string, removeTodoList: string) => void
  demo?: boolean
}

export const TodoList: FC<PropsType> = memo(
  ({ todoList, tasks, removeTask, removeTodoList, addTask, changeTodoListFilter, changeTodoListTitle, changeTaskStatus, changeTaskTitle, demo = false }) => {
    const onClickHandlerCreator = (filter: FilterValuesType) => {
      return () => changeTodoListFilter(filter, todoList.id)
    }
    const addTaskHandler = useCallback(
      (title: string) => {
        addTask(todoList.id, title)
      },
      [addTask, todoList.id]
    )

    const changeTitle = useCallback(
      (newTitle: string) => {
        changeTodoListTitle(newTitle, todoList.id)
      },
      [changeTodoListTitle, todoList.id]
    )
    const getFilteredTasks = (tasks: TaskType[]): TaskType[] => {
      if (todoList.filter === 'active') {
        return tasks.filter((t) => t.status === TasksStatuses.New)
      } else if (todoList.filter === 'completed') {
        return tasks.filter((t) => t.status === TasksStatuses.Completed)
      } else {
        return tasks
      }
    }
    const filteredTasks = getFilteredTasks(tasks)

    const dispatch = useDispatch()
    useEffect(() => {
      if (demo) return
      dispatch(fetchTasks(todoList.id))
    }, [dispatch, todoList.id, demo])

    return (
      <div>
        <h3>
          <EditableSpan title={todoList.title} changeTitle={changeTitle} />
          <IconButton size={'small'} onClick={() => removeTodoList(todoList.id)} disabled={todoList.entityStatus === 'loading'}>
            <DeleteForeverIcon />
          </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler} placeHolder={'Title'} disabled={todoList.entityStatus === 'loading'} />
        <List>
          {tasks &&
            filteredTasks.map((task) => (
              <Task task={task} key={task.id} todolistId={todoList.id} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} />
            ))}
        </List>
        <div className={s.filterButtonsContainer}>
          <Button variant="contained" disableElevation color={todoList.filter === 'all' ? 'warning' : 'primary'} onClick={onClickHandlerCreator('all')}>
            All
          </Button>
          <Button variant="contained" disableElevation color={todoList.filter === 'active' ? 'warning' : 'primary'} onClick={onClickHandlerCreator('active')}>
            Active
          </Button>
          <Button variant="contained" color={todoList.filter === 'completed' ? 'warning' : 'primary'} size="medium" disableElevation onClick={onClickHandlerCreator('completed')}>
            Completed
          </Button>
        </div>
      </div>
    )
  }
)
