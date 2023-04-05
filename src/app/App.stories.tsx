import { App } from './App'
// import { action } from "@storybook/addon-actions"
import { browserRouterDecorator, reduxStoreProviderDecorator } from '../stories/decorators/reduxStoreProviderDecorator'

export default {
  title: 'App Component',
  component: App,
  decorators: [reduxStoreProviderDecorator, browserRouterDecorator],
}

export const AppBaseExample = () => {
  return <App demo={true} />
}
