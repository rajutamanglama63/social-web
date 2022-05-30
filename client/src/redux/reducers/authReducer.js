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
import jwtDecode from "jwt-decode"

const initialState = {
    _id : "",
    userName : "",
    firstName : "",
    lastName : "",
    avatar : null,
    posts : [],
    followers : [],
    followings : [],
    email : "",
    error : "",
    msg : "",
    loading : true,
    isAuthenticated : false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            return state.loading;

        case REGISTER_SUCCESS:
            const registeredUser = action.payload;
            return {...state, loading : false, isAuthenticated : true, _id : registeredUser._id, userName : registeredUser.userName, email : registeredUser.email, firstName : registeredUser.firstName, lastName : registeredUser.lastName, avatar : registeredUser.avatar, posts : registeredUser.posts, followings : registeredUser.followings, followers : registeredUser.followers};

        case REGISTER_FAILURE:
            return {...state, loading : false, isAuthenticated : false, error : action.payload};

        case LOGIN_REQUEST:
            return state.loading;
    
        case LOGIN_SUCCESS:
            const loggedInUser = jwtDecode(action.payload);
            // console.log(loggedInUser)
            return {...state, loading : false, isAuthenticated : true, _id : loggedInUser._id, email : loggedInUser.email, userName : loggedInUser.userName, avatar : loggedInUser.avatar, firstName : loggedInUser.firstName, lastName : loggedInUser.lastName, posts : loggedInUser.posts, followings : loggedInUser.followings, followers : loggedInUser.followers};
            
        case LOGIN_FAILURE:
            return {...state, loading : false, isAuthenticated : false, error : action.payload};

        case LOAD_USER_REQUEST:
            return {...state, loading : true, error : null, isAuthenticated : false}

        case LOAD_USER_SUCCESS:
            const user = action.payload;
            return {...state, loading : false, error : null, email : user.email, isAuthenticated : true, _id : user._id, userName : user.userName, firstName : user.firstName, lastName : user.lastName, posts : user.posts, avatar : user.avatar, followings : user.followings, followers : user.followers}

        case LOAD_USER_FAILURE:
            return {...state, loading : false, error : action.payload, isAuthenticated : false}

        case LOGOUT_REQUEST: 
            return state.loading;

        case LOGOUT_SUCCESS:
            return {...state, loading : false, msg : action.payload}

        case LOGOUT_FAILURE:
            return action.payload;

        default:
            return state;
    }
}