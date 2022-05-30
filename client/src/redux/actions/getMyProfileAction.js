import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const getMyProfile = () => async (dispatch) => {
    try {
        try {
            dispatch({
                type : PROFILE_REQUEST
            })

            const {data} = await axios.get("/user/profile/me")
            console.log(data)

            dispatch({
                type : PROFILE_SUCCESS,
                payload : data.user
            })
        } catch (error) {
            dispatch({
                type : PROFILE_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error)
    }
}