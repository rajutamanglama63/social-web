import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const forgotPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case FORGOT_PASSWORD_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case FORGOT_PASSWORD_FAILURE:
            return {...state, loading : false, error : action.payload, msg : null}
        default:
            return state;
    }
}