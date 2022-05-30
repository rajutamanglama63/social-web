import {
    LOAD_USER_ACCOUNT_REQUEST,
    LOAD_USER_ACCOUNT_SUCCESS,
    LOAD_USER_ACCOUNT_FAILURE
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    user : {},
    error : ""
}

export const getUserAccountReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USER_ACCOUNT_REQUEST:
            return {...state, loading : true, user : null, error : null}
        case LOAD_USER_ACCOUNT_SUCCESS:
            return {...state, loading : false, user : action.payload, error : null}
        case LOAD_USER_ACCOUNT_FAILURE:
            return {...state, loading : false, user : null, error : action.payload}
        default:
            return state;
    }
}