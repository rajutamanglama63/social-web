import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {Cancel} from '@material-ui/icons'
import {Dialog} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useAlert} from 'react-alert'
import Post from "../../components/Post/Post"
import "./profile.css"
import { getMyPosts } from "../../redux/actions/getMyPostsAction"
import Loading from "../../components/Loading/Loading"
import Users from "../../components/Users/Users"
import { deleteUser } from "../../redux/actions/deleteUserAction"
import { logout } from "../../redux/actions/authActions"

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const authenticatedUser = useSelector(state => state.auth)
    // const profile = useSelector(state => state.myProfile)

    const updateUserProfile = useSelector(state => state.updateUserProfile)
    const postLike = useSelector(state => state.likePost)
    const comment = useSelector(state => state.comment)
    const postDelete = useSelector(state => state.postDelete)
    const editPost = useSelector(state => state.editPost)
    const getAllMyPosts = useSelector(state => state.getMyPosts)
    // const profile = useSelector(state => state.myProfile)
    const deactivateUser = useSelector(state => state.deactivateUser)
    const {loading, myPosts} = getAllMyPosts

    const [openFollowersBox, setOpenFollowersBox] = useState(false)
    const [openFollowingsBox, setOpenFollowingsBox] = useState(false)

    const navigateToUpdate = () => {
        navigate("/update")
    }

    const navigateToChangePswd = () => {
        navigate("/changepswd")
    }

    const deactivateExistingUser = async() => {
        await dispatch(deleteUser())
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    useEffect(() => {
        if(postLike.error) {
            alert.error(postLike.error)
        }
        if(postLike.msg){
            alert.show(postLike.msg)
        }

        if(comment.error) {
            alert.error(comment.error)
        }
        if(comment.commentStatusMsg){
            alert.show(comment.commentStatusMsg)
        }

        if(postDelete.error) {
            alert.error(postDelete.error)
        }
        if(postDelete.msg) {
            alert.show(postDelete.msg)
        }

        if(editPost.error) {
            alert.error(editPost.error)
        }
        if(editPost.msg) {
            alert.show(editPost.msg)
        }

        if(updateUserProfile.msg) {
            alert.show(updateUserProfile.msg)
        }
        if(updateUserProfile.error) {
            alert.error(updateUserProfile.error)
        }

        if(deactivateUser.msg) {
            alert.success(deactivateUser.msg)
        }
        if(deactivateUser.error) {
            alert.error(deactivateUser.error)
        }
        
    }, [alert, postLike.error, postLike.msg, comment.commentStatusMsg, comment.error, postDelete.error, postDelete.msg, editPost.error, editPost.msg, updateUserProfile.msg, updateUserProfile.error, deactivateUser.msg, deactivateUser.error])

    return (
        loading === true ? (<Loading />) : (
            <div>
                <div className="profile">
                    <div className="profile_container">
                        <div className="img_section">
                            <img className="background_photo" src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="bg_photo" />
                            {/* <img className="display_pic" src={authenticatedUser.avatar.url} alt="dp" /> */}
                            {authenticatedUser.avatar.url ? (
                                <img className="display_pic" src={authenticatedUser.avatar.url} alt="dp" />
                            ) : (
                                <img className="display_pic" src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="dp" />
                            )}
                        </div>
                        <div className="full_name">
                            <span className="first_name">{authenticatedUser.firstName}</span>
                            <span className="last_name">{authenticatedUser.lastName}</span>
                        </div>
                        <div className="user_property_section">
                            <div className="user_details">
                                <h2 className="user_info">User Information</h2>
                                <span onClick={() => setOpenFollowersBox(true)} className="info"><strong>Followers</strong>  : {authenticatedUser.followers.length}</span>
                                <span onClick={() => setOpenFollowingsBox(true)} className="info"><strong>Followings</strong> : {authenticatedUser.followings.length}</span>
                                <span onClick={navigateToChangePswd} className="info"><strong>Change Password</strong></span>
                                <span onClick={navigateToUpdate} className="info"><strong>Edit Profile</strong></span>
                                <span onClick={deactivateExistingUser} className="info"><strong>Delete Profile</strong></span>
                            </div>
                            <div className="user_post">
                                {myPosts && myPosts.length > 0 ? myPosts.map((myEachPost) => (
                                    <Post key={myEachPost._id} post={myEachPost} loading={loading} />
                                )) : <p>You have no post yet.</p>}
                            </div>
                        </div>
                        <Dialog open={openFollowersBox} onClose={() => setOpenFollowersBox(false)}>
                            <div className="dialog_box">
                                <div className="dialog_box_header">
                                    <h3 style={{marginBottom : "10px"}}>Followers</h3>
                                    <Cancel onClick={() => setOpenFollowersBox(false)} />
                                </div>
                                
                                {authenticatedUser.followers.length > 0 ? (
                                    authenticatedUser.followers.map((eachFollower) => (
                                        <Users key={eachFollower._id} userName={eachFollower.userName} userDp={eachFollower.avatar.url} userId={eachFollower._id}  />
                                    ))
                                ) : <p style={{marginTop : "10px"}}>No follower yet</p>}
                                
                            </div>
                        </Dialog>

                        <Dialog open={openFollowingsBox} onClose={() => setOpenFollowingsBox(false)}>
                            <div className="dialog_box">
                                <div className="dialog_box_header">
                                    <h3 style={{marginBottom : "10px"}}>Followings</h3>
                                    <Cancel onClick={() => setOpenFollowingsBox(false)} />
                                </div>
                                
                                {authenticatedUser.followings.length > 0 ? (
                                    authenticatedUser.followings.map((eachFollowing) => (
                                        <Users key={eachFollowing._id} userName={eachFollowing.userName} userDp={eachFollowing.avatar.url} userId={eachFollowing._id}  />
                                    ))
                                ) : <p style={{marginTop : "10px"}}>No followings yet</p>}
                                
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    )
}

export default Profile
