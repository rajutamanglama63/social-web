import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const updateProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case UPDATE_PROFILE_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case UPDATE_PROFILE_FAILURE:
            return {...state, loading : false, error : action.payload, msg : null}
        default:
            return state;
    }
}