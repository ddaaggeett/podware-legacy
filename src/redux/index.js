import { createStore } from 'redux'
import rootReducer from '../state/reducers'

export const store = createStore(rootReducer)
