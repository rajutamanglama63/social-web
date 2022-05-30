import {
    GET_USER_POST_REQUEST,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    posts : [],
    error : ""
}

export const getUserPostReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_POST_REQUEST:
            return {...state, loading : true, posts : null, error : null}
        case GET_USER_POST_SUCCESS:
            return {...state, loading : false, posts : action.payload, error : null}
        case GET_USER_POST_FAILURE:
            return {...state, loading : false, posts : null, error : action.payload}
        default:
            return state;
    }
}