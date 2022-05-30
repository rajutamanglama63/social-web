import {
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const deletePostReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_POST_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case DELETE_POST_SUCCESS:
            return {...state, error : null, msg : action.payload}
        case DELETE_POST_FAILURE:
            return {...state, error : action.payload, msg : null}
        default:
            return state
    }
}