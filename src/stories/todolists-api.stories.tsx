import React, { useEffect, useState } from 'react'
import { TaskType, todolistsApi, UpdateTaskServerModelType } from '../api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [response, setResponse] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setResponse(res)
    })
  }, [])
  return <pre>{JSON.stringify(response, null, '\t')}</pre>
}
export const CreateTodolist = () => {
  const [response, setResponse] = useState<any>(null)
  useEffect(() => {
    todolistsApi.createTodolist('USA').then((res) => {
      setResponse(res)
    })
  }, [])

  return <pre>{JSON.stringify(response, null, '\t')}</pre>
}
export const DeleteTodolist = () => {
  const [response, setResponse] = useState<any>(null)
  useEffect(() => {
    todolistsApi.deleteTodolist('b6035bc9-5886-47a2-8693-b971c6e43676').then((res) => {
      setResponse(res)
    })
  }, [])
  return <pre>{JSON.stringify(response, null, '\t')}</pre>
}
export const UpdateTodolist = () => {
  const [response, setResponse] = useState<any>(null)
  useEffect(() => {
    todolistsApi.updateTodolist('c4a1e23d-f991-4d1d-b96e-e5084133c65b', 'Florida').then((res) => setResponse(res))
  }, [])

  return <pre>{JSON.stringify(response, null, '\t')}</pre>
}

export const GetTasks = () => {
  const [response, setResponse] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('9a73176f-5cb0-4147-8a8b-95cf3364e1f0')

  const handleSubmit = () => {
    todolistsApi.getTasks(todolistId).then((res) => {
      setResponse(res)
    })
  }
  return (
    <div>
      <pre>{response ? JSON.stringify(response, null, '\t') : 'Please make request'}</pre>
      <input type="text" placeholder="Todolist id" onChange={(e) => setTodolistId(e.currentTarget.value)} value={todolistId} />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  )
}

export const CreateTask = () => {
  const [response, setResponse] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>()
  const [title, setTitle] = useState<string>()
  const handleSubmit = () => {
    if (todolistId && title) {
      todolistsApi.createTask(todolistId, title).then((res) => {
        setResponse(res)
      })
    }
  }

  return (
    <div>
      <pre>{response ? JSON.stringify(response, null, '\t') : 'Please make request'}</pre>
      <input type="text" placeholder="Todolist ID" onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input type="text" placeholder="Task title" onChange={(e) => setTitle(e.currentTarget.value)} />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  )
}
export const DeleteTask = () => {
  const [response, setResponse] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>()
  const [taskId, setTaskId] = useState<string>()

  const handleSubmit = () => {
    if (todolistId && taskId) {
      todolistsApi.deleteTask(todolistId, taskId).then((res) => {
        setResponse(res)
      })
    }
  }
  return (
    <div>
      <pre>{response ? JSON.stringify(response, null, '\t') : 'Please make request'}</pre>
      <input type="text" placeholder="Todolist ID" onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input type="text" placeholder="Task ID" onChange={(e) => setTaskId(e.currentTarget.value)} />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  )
}
export const UpdateTask = () => {
  const [response, setResponse] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>()
  const [taskId, setTaskId] = useState<string>()
  const [title, setTitle] = useState<string>()

  const handleSubmit = () => {
    if (todolistId && taskId && title) {
      const updateTaskData: UpdateTaskServerModelType = {
        title,
        description: 'Desert',
        status: 0,
        priority: 1,
        startDate: '2033-03-12T11:49:52.69',
        deadline: '2053-03-12T11:49:52.69',
      }
      todolistsApi.updateTask(todolistId, taskId, updateTaskData).then((res) => setResponse(res))
    }
  }

  return (
    <div>
      <pre>{response ? JSON.stringify(response, null, '\t') : 'Please make request'}</pre>
      <input type="text" placeholder="Todolist ID" onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input type="text" placeholder="Task ID" onChange={(e) => setTaskId(e.currentTarget.value)} />
      <input type="text" placeholder="Task title" onChange={(e) => setTitle(e.currentTarget.value)} />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  )
}
