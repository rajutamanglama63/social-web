// import {
//     SEARCH_USER_REQUEST,
//     SEARCH_USER_SUCCESS,
//     SEARCH_USER_FAILURE
// } from '../constants/actionTypes'
// import axios from 'axios'

// export const searchUser = (name = "") => async(dispatch) => {
//     try {
//         try {
//             dispatch({
//                 type : SEARCH_USER_REQUEST
//             })

//             const {data} = await axios.get(`/user/search?userName=${name}`)
//             console.log(data)

//             dispatch({
//                 type : SEARCH_USER_SUCCESS,
//                 payload : data.users
//             })
//         } catch (error) {
//             dispatch({
//                 type : SEARCH_USER_FAILURE,
//                 payload : error.data.response.msg
//             })
//         }
        
//     } catch (error) {
//         console.log(error)
//     }
// }