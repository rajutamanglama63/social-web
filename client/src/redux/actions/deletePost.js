import {
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const deletePost = (id) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : DELETE_POST_REQUEST,
            })

            const {data} = await axios.delete(`/post/delete/${id}`)

            dispatch({
                type : DELETE_POST_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : DELETE_POST_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}