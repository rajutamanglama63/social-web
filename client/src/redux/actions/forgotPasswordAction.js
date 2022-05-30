import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const passwordForgotten = (email) => async (dispatch) => {
    try {
        try {
           dispatch({
               type : FORGOT_PASSWORD_REQUEST
           }) 

           const {data} = await axios.post('/auth/forget/Password', {email}, {headers : {"Content-Type" : "application/json"}})

           dispatch({
               type : FORGOT_PASSWORD_SUCCESS,
               payload : data.msg
           })
        } catch (error) {
            dispatch({
                type : FORGOT_PASSWORD_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}