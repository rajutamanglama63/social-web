import {
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const editPostReducer = (state = initialState, action) => {
    switch(action.type) {
        case EDIT_POST_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case EDIT_POST_SUCCESS:
            return {...state, loading : false, error : null, msg : action.payload}
        case EDIT_POST_FAILURE:
            return {...state, loading : true, error : action.payload, msg : null}
        default:
            return state;
    }
}