import {
    LOAD_USER_ACCOUNT_REQUEST,
    LOAD_USER_ACCOUNT_SUCCESS,
    LOAD_USER_ACCOUNT_FAILURE
} from '../constants/actionTypes'
import axios from 'axios'


export const getOtherIndividualUserAccount = (id) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : LOAD_USER_ACCOUNT_REQUEST
            })

            const {data} = await axios.get(`/user/specific/${id}`)

            dispatch({
                type : LOAD_USER_ACCOUNT_SUCCESS,
                payload : data.user
            })
            
        } catch (error) {
            dispatch({
                type : LOAD_USER_ACCOUNT_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}