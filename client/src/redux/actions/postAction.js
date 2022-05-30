import {
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const getPostsOfFollowings = () => async (dispatch) => {
    try {
        try {
            dispatch({
                type : GET_POST_REQUEST,
            });

            // fetching posts of people whom we have followed
            const {data} = await axios.get("/user/getPostOfFollowings");

            dispatch({
                type : GET_POST_SUCCESS,
                payload : data.posts
            })
        } catch (error) {
            dispatch({
                type : GET_POST_FAILURE,
                payload : error.response.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

