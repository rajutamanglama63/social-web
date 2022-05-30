import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    success : false,
    msg : "",
    error : ""
}

export const changePswdReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return {...state, loading : true, msg : null, error : null, success : false}
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, loading : false, msg : action.payload, success : true, error : null}
        case CHANGE_PASSWORD_FAILURE:
            return {...state, loading : false, msg : null, success : false, error : action.payload}
        default:
            return state;
    }
}