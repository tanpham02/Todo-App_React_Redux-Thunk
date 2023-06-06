import { legacy_createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = legacy_createStore(
    rootReducer,
    composeEnhancer
)

export default store