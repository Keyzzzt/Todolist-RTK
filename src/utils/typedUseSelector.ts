import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { StateType } from '../store/store'

export const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector
