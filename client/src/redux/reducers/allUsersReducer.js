import {
    ALL_USER_REQUEST, 
    ALL_USER_SUCCESS, 
    ALL_USER_FAILURE, 
} from '../constants/actionTypes'

const initialState = {
    loading : true,
    error : "",
    users : []
}

export const allUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_USER_REQUEST:
            return {...state, loading : true, error : null, users : []}
        case ALL_USER_SUCCESS:
            return {...state, loading : false, error : null, users : action.payload}
        case ALL_USER_FAILURE:
            return {...state, loading : false, error : action.payload, users : []}
        default:
            return state;
    }
}