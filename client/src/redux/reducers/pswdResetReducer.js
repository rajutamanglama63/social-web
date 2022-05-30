import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESET_PASSWORD_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case RESET_PASSWORD_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case RESET_PASSWORD_FAILURE:
            return {...state, loading : false, error : action.payload, msg : null}
        default:
            return state;
    }
}