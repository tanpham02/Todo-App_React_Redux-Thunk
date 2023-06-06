import { createSelector } from 'reselect'

const todoLists = state => state.todos.todoLists
const filterBySearch = state => state.filters.search
const filterByStatus = state => state.filters.status
const filterByPriorities = state => state.filters.priorities


const todoSelectors = createSelector(
    todoLists,
    filterBySearch,
    filterByStatus,
    filterByPriorities,
    (todos, search, status, priorities) => {
        const todoRemainings = todos.filter(todo => {
            if (status === 'All') {
                return priorities.length ?
                    (priorities.includes(todo.priority) &&
                        todo.name.toLowerCase().includes(search.toLowerCase())) :
                    todo.name.toLowerCase().includes(search.toLowerCase())
            }

            return (
                status !== 'All' &&
                todo.name.toLowerCase().includes(search.toLowerCase()) &&
                (status === 'Completed' ?
                    todo.completed :
                    !todo.completed) &&
                (priorities.length ? priorities.includes(todo.priority) : true) // length < 0 return true === all
            )
        })

        return todoRemainings
    }

)

export { todoSelectors }