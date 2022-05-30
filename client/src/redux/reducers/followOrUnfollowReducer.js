import {
    FOLLOW_OR_UNFOLLOW_USER_REQUEST,
    FOLLOW_OR_UNFOLLOW_USER_SUCCESS,
    FOLLOW_OR_UNFOLLOW_USER_FAILURE
} from "../constants/actionTypes"

const initialState = {
    loading : false,
    error : "",
    msg : ""
}

export const followOrUnfollowReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW_OR_UNFOLLOW_USER_REQUEST:
            return {...state, loading : true, error : null, msg : null}
        case FOLLOW_OR_UNFOLLOW_USER_SUCCESS:
            return {...state, loading : false, msg : action.payload, error : null}
        case FOLLOW_OR_UNFOLLOW_USER_FAILURE:
            return {...state, loading : false, error : action.payload, msg : null}
        default:
            return state;
    }
}