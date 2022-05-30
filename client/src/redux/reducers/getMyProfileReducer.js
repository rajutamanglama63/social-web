import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : true,
    error : "",
    user : {}
}

export const getMyProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case PROFILE_REQUEST:
            return {...state, error : null, user : {}}
        case PROFILE_SUCCESS:
            return {...state, loading : false, error : null, user : action.payload}
        case PROFILE_FAILURE:
            return {...state, loading : false, error : action.payload, user : null}
        default:
            return state;
    }
}