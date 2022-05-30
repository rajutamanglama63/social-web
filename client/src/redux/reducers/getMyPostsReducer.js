import {
    GET_MY_POST_REQUEST,
    GET_MY_POST_SUCCESS,
    GET_MY_POST_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : true,
    error : "",
    myPosts : []
}

export const getMyPostsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MY_POST_REQUEST:
            return {...state, error : null, myPosts : []}
        case GET_MY_POST_SUCCESS:
            return {...state, loading : false, error : null, myPosts : action.payload}
        case GET_MY_POST_FAILURE:
            return {...state, loading : false, error : action.payload, myPosts : null}
        default:
            return state;
    }
}