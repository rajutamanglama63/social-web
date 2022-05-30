import {
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const likePost = (id) => async (dispatch) => {
    try {
        try {
           dispatch({
               type : LIKE_POST_REQUEST
           }) 

           const {data} = await axios.get(`/post/${id}`)

           dispatch({
               type : LIKE_POST_SUCCESS,
               payload : data.msg
           })
        } catch (error) {
            dispatch({
                type : LIKE_POST_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}