import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'

export const deleteUser = () => async (dispatch) => {
    try {
        try {
            dispatch({
                type : DELETE_USER_REQUEST
            })

            const {data} = await axios.delete('/user/profile/deactivate')

            dispatch({
                type : DELETE_USER_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : DELETE_USER_FAILURE,
                payload : error.data.response.message
            })
        }
    } catch (error) {
        console.log(error)
    }
}