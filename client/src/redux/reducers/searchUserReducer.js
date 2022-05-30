// import {
//     SEARCH_USER_REQUEST,
//     SEARCH_USER_SUCCESS,
//     SEARCH_USER_FAILURE
// } from '../constants/actionTypes'

// const initialState = {
//     loading : false,
//     users : [],
//     msg : ""
// }

// export const searchUserReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case SEARCH_USER_REQUEST:
//             return {...state, loading : true, msg : null, users : []}
//         case SEARCH_USER_SUCCESS:
//             return {...state, loading : false, msg : null, users : action.payload}
//         case SEARCH_USER_FAILURE:
//             return {...state, loading : false, msg : action.payload, users : []}
//         default:
//             return state;
//     }
// } 