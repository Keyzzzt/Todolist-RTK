import { appReducer, AppStateType, setAppError, setAppStatus } from './appReducer'

const startState: AppStateType = {
  status: 'idle',
  error: '',
  isInitialized: false,
}

test('Should set status', () => {
  const status = 'failed'
  const endState = appReducer(startState, setAppStatus({ status }))
  expect(endState.status).toEqual(status)
})
test('Should set error message', () => {
  const error = 'Some error occured'
  const endState = appReducer(startState, setAppError({ error }))
  expect(endState.error).toEqual(error)
})
