import {
    ADD_NEW_POST_REQUEST,
    ADD_NEW_POST_SUCCESS, 
    ADD_NEW_POST_FAILURE,
} from '../constants/actionTypes'

const initialState = {
    loading : false,
    error : "",
    msg : "",
}

export const addNewPostReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_NEW_POST_REQUEST:
            return {...state, loading : true, error : null}
        case ADD_NEW_POST_SUCCESS:
            return {...state, loading : false, error : null, msg : action.payload}
        case ADD_NEW_POST_FAILURE:
            return {...state, errro : action.payload, msg : null}
        default:
            return state 
    }
}