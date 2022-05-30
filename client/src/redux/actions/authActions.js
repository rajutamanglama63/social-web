import {
    REGISTER_REQUEST, 
    REGISTER_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_SUCCESS, 
    LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE
} from "../constants/actionTypes"
import axios from "axios"

export const userRegistration = (userData) => async (dispatch) => {
    try {
        try {
            dispatch({
                type : REGISTER_REQUEST
            });
    
            const {data} = await axios.post("/auth/register", userData, {headers : {"Content-Type" : "application/json"}});
            
    
            dispatch({
                type : REGISTER_SUCCESS,
                payload : data.newUser
            });
        } catch (error) {
            dispatch({
                type : REGISTER_FAILURE,
                payload : error.message
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        // this wired nested trycatch block is use here to avoid type error
        try {
            dispatch({
                type : LOGIN_REQUEST,
            });
    
            const {data} = await axios.post("/auth/login", {email, password}, {headers : {"Content-Type" : "application/json"}});
    
            dispatch({
                type : LOGIN_SUCCESS,
                payload : data.token
            });
        } catch (error) {
            dispatch({
                type : LOGIN_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        try {
            dispatch({
                type : LOAD_USER_REQUEST
            });

            const {data} = await axios.get("/user/profile/me");

            dispatch({
                type : LOAD_USER_SUCCESS,
                payload : data.user
            })
        } catch (error) {
            dispatch({
                type : LOAD_USER_FAILURE,
                payload : error.response.data.msg
            })
        }
    } catch (error) {
        console.log(error);
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type : LOGOUT_REQUEST
        });

        const {data} = await axios.get("/auth/logout");

        dispatch({
            type : LOGOUT_SUCCESS,
            payload : data.msg
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type : LOGOUT_FAILURE,
            payload : error.message
        })
    }
}