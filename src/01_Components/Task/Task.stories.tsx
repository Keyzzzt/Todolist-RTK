import { Task } from './Task'
import { action } from '@storybook/addon-actions'
import { TaskPriorities, TasksStatuses } from '../../api'

export default {
  title: 'Task Component',
  component: Task,
}

const changeTaskStatusCallback = action('Task status changed')
const changeTaskTitleCallback = action('Task title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: '2w',
          title: 'HTML&CSS',
          status: TasksStatuses.New,
          addedDate: '',
          deadline: '',
          order: 0,
          startDate: '',
          todoListId: '1',
          description: '',
          priority: TaskPriorities.Hi,
        }}
        todolistId={'1'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
      />
      <Task
        task={{
          id: '2w',
          title: 'HTML&CSS',
          status: TasksStatuses.Completed,
          addedDate: '',
          deadline: '',
          order: 0,
          startDate: '',
          todoListId: '1',
          description: '',
          priority: TaskPriorities.Hi,
        }}
        todolistId={'2'}
        removeTask={removeTaskCallback}
        changeTaskTitle={changeTaskTitleCallback}
        changeTaskStatus={changeTaskStatusCallback}
      />
    </>
  )
}
