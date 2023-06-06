import {
    FILTERBYSEARCH,
    FILTERBYSTATUS,
    FILTERBYPRIORITIES
} from '../../redux/actions'

const initialState = {
    search: '',
    status: 'All',
    priorities: []
}

const filterSlice = (state = initialState, action) => {
    switch (action.type) {
        case FILTERBYSEARCH:
            return {
                ...state,
                search: action.payload
            }

        case FILTERBYSTATUS:
            return {
                ...state,
                status: action.payload
            }

        case FILTERBYPRIORITIES:
            return {
                ...state,
                priorities: action.payload
            }


        default:
            return state
    }
}

export default filterSlice