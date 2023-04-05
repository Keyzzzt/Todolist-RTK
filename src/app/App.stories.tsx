import { App } from './App'
// import { action } from "@storybook/addon-actions"
import { reduxStoreProviderDecorator } from '../stories/decorators/reduxStoreProviderDecorator'

export default {
  title: 'App Component',
  component: App,
  decorators: [reduxStoreProviderDecorator],
}

// const changeTaskTitleCallback = action("Task title changed")

export const AppBaseExample = () => {
  return <App demo={true} />
}
