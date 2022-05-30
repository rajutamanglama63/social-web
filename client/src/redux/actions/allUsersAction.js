import {
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS, 
    ALL_USER_FAILURE,
} from '../constants/actionTypes'
import axios from 'axios'

export const allUsersList = (name = "") => async (dispatch) => {
    try {
        try {
            dispatch({
                type : ALL_USER_REQUEST
            })

            const {data} = await axios.get(`/user/users?userName=${name}`)
            console.log(data)

            dispatch({
                type : ALL_USER_SUCCESS,
                payload : data.users
            })
        } catch (error) {
            dispatch({
                type : ALL_USER_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}

