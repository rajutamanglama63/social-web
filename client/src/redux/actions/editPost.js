import {
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const editPost = (caption, id) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : EDIT_POST_REQUEST
            })

            const {data} = await axios.put(`/post/update/caption/${id}`, {caption}, {headers : {"contentType" : "application/json"}})

            dispatch({
                type : EDIT_POST_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : EDIT_POST_FAILURE,
                payload : error.data.response.msg
            })
        }
    } catch (error) {
        console(error)
    }
}