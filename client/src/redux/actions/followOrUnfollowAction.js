import {
    FOLLOW_OR_UNFOLLOW_USER_REQUEST,
    FOLLOW_OR_UNFOLLOW_USER_SUCCESS,
    FOLLOW_OR_UNFOLLOW_USER_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const followOrUnfollowUserUser = (id) => async (dispatch) => {
    try {
        try {
           dispatch({
               type : FOLLOW_OR_UNFOLLOW_USER_REQUEST
           }) 

           const {data} = await axios.get(`/user/follow/${id}`)

           dispatch({
               type : FOLLOW_OR_UNFOLLOW_USER_SUCCESS,
               payload : data.msg
           })
        } catch (error) {
            dispatch({
                type : FOLLOW_OR_UNFOLLOW_USER_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}