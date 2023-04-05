import { FC, useCallback } from 'react'
import { Grid, Paper } from '@mui/material'
import { TodoList } from '../Todolist'
import { changeTodolistTitle, createTodolist, deleteTodolist, fetchTodolists, FilterValuesType, setTodolistFilter } from '../../../store/reducers/reducers/todoListsReducer'
import { TasksStatuses } from '../../../api'
import { createTask, deleteTask, updateTaskTC } from '../../../store/reducers/reducers/tasksReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AddItemForm } from '../../AddItemForm/AddItemForm'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../../utils/typedUseSelector'

type TodolistsListProps = {
  demo?: boolean
}

export const TodolistsList: FC<TodolistsListProps> = ({ demo }) => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)
  const tasks = useTypedSelector((state) => state.tasks)
  const todolists = useTypedSelector((state) => state.todos)
  const dispatch = useDispatch()
  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(fetchTodolists())
  }, [dispatch, demo, isLoggedIn])

  const addTask = useCallback(
    (taskId: string, title: string) => {
      dispatch(createTask(taskId, title))
    },
    [dispatch]
  )
  const removeTask = useCallback(
    (taskId: string, todoListId: string): void => {
      dispatch(deleteTask(todoListId, taskId))
    },
    [dispatch]
  )

  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(deleteTodolist(todoListId))
    },
    [dispatch]
  )
  const changeTodoListFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      dispatch(setTodolistFilter({ todolistId, filter }))
    },
    [dispatch]
  )
  const changeTodoListTitleHandler = useCallback(
    (newTitle: string, todolistId: string): void => {
      dispatch(changeTodolistTitle(todolistId, newTitle))
    },
    [dispatch]
  )
  const updateTaskStatusHandler = useCallback(
    (todolistId: string, taskId: string, status: TasksStatuses): void => {
      dispatch(updateTaskTC(todolistId, taskId, { status }))
    },
    [dispatch]
  )
  const updateTaskTitleHandler = useCallback(
    (taskId: string, todoListId: string, title: string) => {
      dispatch(updateTaskTC(todoListId, taskId, { title }))
    },
    [dispatch]
  )
  const addTodoList = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch]
  )

  if (!isLoggedIn) return <Navigate to="/login" />

  return (
    <>
      <AddItemForm addItem={addTodoList} placeHolder={'Add new todo list'} />

      {todolists.length &&
        todolists.map((t) => (
          <Grid item key={t.id}>
            <Paper elevation={8} style={{ padding: '20px' }}>
              <TodoList
                demo={demo}
                todoList={t}
                tasks={tasks[t.id]}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={updateTaskTitleHandler}
                changeTaskStatus={updateTaskStatusHandler}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitleHandler}
              />
            </Paper>
          </Grid>
        ))}
    </>
  )
}
