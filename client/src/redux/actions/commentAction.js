import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'


export const commentOnPost = (postId, comment) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : COMMENT_REQUEST,
            })

            const {data} = await axios.put(`/post/comment/${postId}`, {comment}, {header : {"content-type" : "application/json"}})

            dispatch({
                type : COMMENT_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : COMMENT_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : DELETE_COMMENT_REQUEST
            });

            const {data} = await axios.delete(`/post/delete/comment/${id}`, {commentId})
            console.log(data)

            dispatch({
                type : DELETE_COMMENT_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : DELETE_COMMENT_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}