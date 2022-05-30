import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'

export const changePswd = (oldPassword, newPassword) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : CHANGE_PASSWORD_REQUEST
            })

            const {data} = await axios.put('/user/update/password', {oldPassword, newPassword}, {headers : {"Content-Type" : "application/json"}})
            // console.log(data.msg)
            dispatch({
                type : CHANGE_PASSWORD_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : CHANGE_PASSWORD_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}