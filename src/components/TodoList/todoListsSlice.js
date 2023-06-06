import axios from "axios"
import {
    GETALLTODOS,
    ADDTODO,
    TOGGLETODO,
    getAllTodos,
    addTodo,
    toggleTodo,
} from "../../redux/actions"

const initialState = {
    todoLists: [],
    status: 'Rest'
}

const todoListsSlice = (state = initialState, action) => {
    switch (action.type) {
        case GETALLTODOS:
            return {
                ...state,
                todoLists: [...action.payload]
            }
        case ADDTODO:
            return {
                ...state,
                todoLists: [...state.todoLists, action.payload]
            }
        case TOGGLETODO:
            const newTodoList = state.todoLists.map(todo => (
                todo.id === action.payload.id ?
                    { ...todo, completed: action.payload.completed } :
                    todo
            ))
            return {
                ...state,
                todoLists: [...newTodoList]
            }

        default:
            return state
    }
}


// THUNK
const getAllTodosThunk = () => {
    return async (dispatch) => {
        const res = await axios('http://localhost:9002/todoLists')
        const todos = await res.data
        dispatch(getAllTodos(todos))
    }
}

const addTodoThunk = (newTodo) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:9002/todoLists', newTodo)
        const todo = await res.data
        dispatch(addTodo(todo))
    }
}

const toggleTodoThunk = id => {
    return async (dispatch) => {
        const res = await axios(`http://localhost:9002/todoLists/${id}`)
        const todo = await res.data
        const resUpdate = await axios.put(`http://localhost:9002/todoLists/${id}`, {
            ...todo,
            completed: !todo.completed
        })
        const result = await resUpdate.data
        dispatch(toggleTodo(result))
    }
}

export default todoListsSlice
export {
    getAllTodosThunk,
    addTodoThunk,
    toggleTodoThunk,
}