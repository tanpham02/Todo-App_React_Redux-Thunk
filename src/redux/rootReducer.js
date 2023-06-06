import { combineReducers } from 'redux'
import todoListsSlice from '../components/TodoList/todoListsSlice'
import filterSlice from '../components/Filters/filterSlice'


const rootReducer = combineReducers({
    filters: filterSlice,
    todos: todoListsSlice,
})

export default rootReducer