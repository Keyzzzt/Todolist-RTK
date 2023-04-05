import { EditableSpan } from "./EditableSpan"
import { action } from "@storybook/addon-actions"

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
}

const changeTaskTitleCallback = action("Task title changed")

export const EditableSpanBaseExample = () => {
  return (
    <>
      <EditableSpan title="Any title" changeTitle={changeTaskTitleCallback} />
    </>
  )
}
