import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'

export const profileUpdate = (updateProfileData) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : UPDATE_PROFILE_REQUEST
            })

            const {data} = await axios.put('/user/update/profile', updateProfileData, {headers : {"Content-Type" : "application/json"}})

            dispatch({
                type : UPDATE_PROFILE_SUCCESS,
                payload : data.msg
            })
        } catch (error) {
            dispatch({
                type : UPDATE_PROFILE_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}