import {
    GET_MY_POST_REQUEST,
    GET_MY_POST_SUCCESS,
    GET_MY_POST_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const getMyPosts = () => async (dispatch) => {
    try {
        try {
            dispatch({
                type : GET_MY_POST_REQUEST
            })

            const {data} = await axios.get("/user/getMyPosts")

            dispatch({
                type : GET_MY_POST_SUCCESS,
                payload : data.posts
            })
        } catch (error) {
            dispatch({
                type : GET_MY_POST_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}