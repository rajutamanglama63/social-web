import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { authReducer } from "./reducers/authReducer";
import { postReducer } from "./reducers/postReducer";
import { likePostReducer } from "./reducers/likePostReducer";
import { commentReducer } from "./reducers/commentReducer";
import { allUserReducer } from "./reducers/allUsersReducer";
import { getMyPostsReducer } from "./reducers/getMyPostsReducer";
import { addNewPostReducer } from "./reducers/addNewPostReducer";
import { deletePostReducer } from "./reducers/deletePostReducer";
import { editPostReducer } from "./reducers/editPostReducer";
import { updateProfileReducer } from "./reducers/updateProfileReducer";
import { changePswdReducer } from "./reducers/changePswdReducer";
import { deleteUserReducer } from "./reducers/deleteUserReducer";
import { forgotPasswordReducer } from "./reducers/forgotPasswordReducer";
import { resetPasswordReducer } from "./reducers/pswdResetReducer";
import { getUserAccountReducer } from "./reducers/getUserAccountReducer";
import { getUserPostReducer } from "./reducers/getUserPostReducer";
import { followOrUnfollowReducer } from "./reducers/followOrUnfollowReducer";
import { getMyProfileReducer } from "./reducers/getMyProfileReducer";
// import { searchUserReducer } from "./reducers/searchUserReducer";

const middleware = [thunk];

const reducers = combineReducers({
    auth : authReducer,
    posts : postReducer,
    likePost : likePostReducer,
    comment : commentReducer,
    allUsers : allUserReducer,
    getMyPosts : getMyPostsReducer,
    addPost : addNewPostReducer,
    postDelete : deletePostReducer,
    editPost : editPostReducer,
    updateUserProfile : updateProfileReducer,
    pswdChange : changePswdReducer,
    deactivateUser : deleteUserReducer,
    forgotPassword : forgotPasswordReducer,
    resetPswd : resetPasswordReducer,
    getUserAccount : getUserAccountReducer,
    getUserPost : getUserPostReducer,
    followOrUnfollow : followOrUnfollowReducer,
    myProfile : getMyProfileReducer,
    // search : searchUserReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export default store;