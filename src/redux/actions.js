const GETALLTODOS = 'getAllTodos'
const ADDTODO = 'addTodo'
const TOGGLETODO = 'toggleTodo'
const FILTERBYSEARCH = 'filterBySearch'
const FILTERBYSTATUS = 'filterByStatus'
const FILTERBYPRIORITIES = 'filterByPriorities'



const getAllTodos = todos => {
    return {
        type: GETALLTODOS,
        payload: todos
    }
}

const addTodo = newTodo => {
    return {
        type: ADDTODO,
        payload: newTodo
    }
}

const toggleTodo = id => {
    return {
        type: TOGGLETODO,
        payload: id
    }
}

const filterBySearch = searchText => {
    return {
        type: FILTERBYSEARCH,
        payload: searchText
    }
}

const filterByStatus = statusText => {
    return {
        type: FILTERBYSTATUS,
        payload: statusText
    }
}


const filterByPriorities = priorities => {
    return {
        type: FILTERBYPRIORITIES,
        payload: priorities
    }
}


export {
    GETALLTODOS,
    ADDTODO,
    TOGGLETODO,
    FILTERBYSEARCH,
    FILTERBYSTATUS,
    FILTERBYPRIORITIES,
    getAllTodos,
    addTodo,
    toggleTodo,
    filterBySearch,
    filterByStatus,
    filterByPriorities
}