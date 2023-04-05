import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
}

const callback = action('Add button was clicked')

export const AddItemFormBase = (props: any) => {
  return <AddItemForm placeHolder="Enter value..." addItem={callback} />
}

export const AddItemFormDisabled = (props: any) => {
  return <AddItemForm placeHolder="Enter value..." addItem={callback} disabled={true} />
}
