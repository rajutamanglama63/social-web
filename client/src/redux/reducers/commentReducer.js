import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    error : "",
    commentStatusMsg : "",
}

export const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case COMMENT_REQUEST:
            return {...state, loading : true, error : null, commentStatusMsg : null};
        case COMMENT_SUCCESS:
            return {...state, loading : false, commentStatusMsg : action.payload}
        case COMMENT_FAILURE:
            return {...state, loading : false, error : action.payload, commentStatusMsg : null};
        case DELETE_COMMENT_REQUEST:
            return {...state, loading : true, error : null, commentStatusMsg : null};
        case DELETE_COMMENT_SUCCESS:
            return {...state, loading : false, error : null, commentStatusMsg : action.payload}
        case DELETE_COMMENT_FAILURE:
            return {...state, loading : false, error : action.payload, commentStatusMsg : null};
        default:
            return state;
    }
}