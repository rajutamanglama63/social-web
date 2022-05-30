import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    msg : "",
    error : ""
}

export const deleteUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_USER_REQUEST:
            return {...state, loading : true, msg : null, error : null}
        case DELETE_USER_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case DELETE_USER_FAILURE:
            return {...state, loading : false, msg : null, error : action.payload}
        default:
            return state;
    }
}