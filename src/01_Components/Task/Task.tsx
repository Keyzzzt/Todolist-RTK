import { memo, FC } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { IconButton, ListItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { TasksStatuses, TaskType } from '../../api'

type TaskProps = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (todolistId: string, taskId: string, status: TasksStatuses) => void
  changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
  removeTask: (id: string, todoListId: string) => void
}

export const Task: FC<TaskProps> = memo(({ task, todolistId, changeTaskStatus, changeTaskTitle, removeTask }) => {
  const changeTitleHandler = (newTitle: string) => {
    changeTaskTitle(task.id, todolistId, newTitle)
  }
  return (
    <ListItem key={task.id}>
      <input
        type="checkbox"
        checked={task.status === TasksStatuses.Completed}
        onChange={(e) => changeTaskStatus(todolistId, task.id, e.target.checked ? TasksStatuses.Completed : TasksStatuses.New)}
      />
      <EditableSpan title={task.title} changeTitle={changeTitleHandler} />
      <IconButton size={'small'} onClick={() => removeTask(task.id, todolistId)}>
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  )
})
