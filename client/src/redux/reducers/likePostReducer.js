import {
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const likePostReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIKE_POST_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case LIKE_POST_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case LIKE_POST_FAILURE:
            return {...state, loading : false, error : action.payload, msg : null}
        default:
            return state;
    }
}