import axios from "axios"
import {
    GETALLTODOS,
    ADDTODO,
    TOGGLETODO,
    EDITTODO,
    getAllTodos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    DELETETODO,
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

        case EDITTODO:
            const editTodo = state.todoLists.map(todo => (
                todo.id === action.payload.id ?
                    action.payload :
                    todo
            ))
            return {
                ...state,
                todoLists: [...editTodo]
            }

        case DELETETODO:
            const todoRemainings = state.todoLists.filter(todo => todo.id !== action.payload)
            return {
                state,
                todoLists: [...todoRemainings]
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

const editTodoThunk = todoUpdate => {
    return async (dispatch) => {
        const update = await axios.put(`http://localhost:9002/todoLists/${todoUpdate.id}`, {
            ...todoUpdate,
            name: todoUpdate.name
        })
        const result = await update.data
        dispatch(editTodo(result))
    }
}

const deleteTodoThunk = id => {
    return async (dispatch) => {
        await axios.delete(`http://localhost:9002/todoLists/${id}`)
        dispatch(deleteTodo(id))
    }
}

export default todoListsSlice
export {
    getAllTodosThunk,
    addTodoThunk,
    toggleTodoThunk,
    editTodoThunk,
    deleteTodoThunk
}