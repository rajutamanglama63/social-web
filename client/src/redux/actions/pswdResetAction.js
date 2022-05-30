import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const passwordReset = (token, password) => async (dispatch) => {
    try {
        try {
           dispatch({
               type : RESET_PASSWORD_REQUEST
           }) 

           const {data} = await axios.put(`/auth/password/reset/${token}`, {password}, {headers : {"Content-Type" : "application/json"}})

           dispatch({
               type : RESET_PASSWORD_SUCCESS,
               payload : data.msg
           })
        } catch (error) {
            dispatch({
                type : RESET_PASSWORD_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}