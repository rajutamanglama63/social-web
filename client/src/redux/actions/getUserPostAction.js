import {
    GET_USER_POST_REQUEST,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'


export const getOtherIndividualUserPost = (id) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : GET_USER_POST_REQUEST
            })

            const {data} = await axios.get(`/user/userPost/${id}`)

            dispatch({
                type : GET_USER_POST_SUCCESS,
                payload : data.posts
            })
            
        } catch (error) {
            dispatch({
                type : GET_USER_POST_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}