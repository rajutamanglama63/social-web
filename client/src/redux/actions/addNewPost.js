import {
    ADD_NEW_POST_REQUEST,
    ADD_NEW_POST_SUCCESS, 
    ADD_NEW_POST_FAILURE,
} from '../constants/actionTypes'
import axios from 'axios'

export const addNewPost = (caption, image) => async(dispatch) => {
    try {
        try {
            dispatch({
                type : ADD_NEW_POST_REQUEST
            })

            const {data} = await axios.post("/post/upload", {caption, image}, {headers : {"Content-Type" : "application/json"}})

            dispatch({
                type : ADD_NEW_POST_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : ADD_NEW_POST_FAILURE,
                payload : error.data.response.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
} 