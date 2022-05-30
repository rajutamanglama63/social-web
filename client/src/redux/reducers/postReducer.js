import {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    posts : []
}

export const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POST_REQUEST:
            return {...state, loading : true};
        case GET_POST_SUCCESS:
            return {...state, loading : false, posts : action.payload};
        case GET_POST_FAILURE:
            return {...state, loading : false, error : action.payload};
        default:
            return state;
    }
}