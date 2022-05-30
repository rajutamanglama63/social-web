import {useSelector, useDispatch} from "react-redux"
import { useParams} from 'react-router-dom'
import {Cancel} from '@material-ui/icons'
import {Dialog, Avatar} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useAlert} from 'react-alert'
import Post from "../../components/Post/Post"
import "./userAccount.css"
// import { getMyPosts } from "../../redux/actions/getMyPostsAction"
import Loading from "../../components/Loading/Loading"
import Users from "../../components/Users/Users"
import { getOtherIndividualUserPost } from "../../redux/actions/getUserPostAction"
import { getOtherIndividualUserAccount } from "../../redux/actions/getUserAction"
import { followOrUnfollowUserUser } from "../../redux/actions/followOrUnfollowAction"

const UserAccont = () => {
    // const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const authenticatedUser = useSelector(state => state.auth)
    const {user, error, loading} = useSelector(state => state.getUserAccount)
    const followOrUnfollow = useSelector(state => state.followOrUnfollow)
    const getUserPost = useSelector(state => state.getUserPost)
    const postLike = useSelector(state => state.likePost)
    const comment = useSelector(state => state.comment)
    // const getAllMyPosts = useSelector(state => state.getMyPosts)
    // const {loading, myPosts} = getAllMyPosts

    const [openFollowersBox, setOpenFollowersBox] = useState(false)
    const [openFollowingsBox, setOpenFollowingsBox] = useState(false)

    const [followingUser, setFollowingUser] = useState(false)
    const [myPersonalProfile, setMyPesonalProfile] = useState(false)

    const followOrUnFollowUser = async () => {
        setFollowingUser(!followingUser)
        await dispatch(followOrUnfollowUserUser(user._id))
        dispatch(getOtherIndividualUserAccount(params.id))
    }
    

    useEffect(() => { 
        const dispatchFunction = async () => {
            await dispatch(getOtherIndividualUserAccount(params.id))
            dispatch(getOtherIndividualUserPost(params.id))
        }
        dispatchFunction()

        // if(user) {
        //     user.followers.forEach((individualFollower) => {
        //         if(authenticatedUser._id === individualFollower._id) {
        //             setFollowingUser(true)
        //         }else {
        //             setFollowingUser(false)
        //         }
        //     }) 
        // }
    }, [dispatch, params.id])

    useEffect(() => {
        if(authenticatedUser._id === params.id) {
            setMyPesonalProfile(true)
        }

        // if(user === null) {
        //     dispatch(getOtherIndividualUserAccount(params.id))

        //     user.followers.forEach((individualFollower) => {
        //         if(authenticatedUser._id === individualFollower._id) {
        //             setFollowingUser(true)
        //         }else {
        //             setFollowingUser(false)
        //         }
        //     }) 
        // }

        if(getUserPost.posts) {
            getUserPost.posts.map((post) => {
                return post.user.followers.forEach((individualFollower) => {
                    if(authenticatedUser._id === individualFollower) {
                            setFollowingUser(true)
                        }else {
                            setFollowingUser(false)
                        }
                    })
                }
            )
        }
        
    }, [authenticatedUser._id, params.id, user, getUserPost.posts])



    useEffect(() => {
        if(postLike.error) {
            alert.error(postLike.error)
        }
        if(postLike.msg){
            alert.success(postLike.msg)
        }

        if(comment.error) {
            alert.error(comment.error)
        }
        if(comment.commentStatusMsg){
            alert.success(comment.commentStatusMsg)
        }

        if(error) {
            alert.error(error)
        }

        if(followOrUnfollow.msg) {
            alert.success(followOrUnfollow.msg)
        }
        if(followOrUnfollow.error) {
            alert.error(followOrUnfollow.error)
        }
        
    }, [alert, postLike.error, postLike.msg, comment.commentStatusMsg, comment.error, error, followOrUnfollow.error, followOrUnfollow.msg])

    return (
        loading ? (<Loading />) : (
            <div>
                <div className="profile">
                    <div className="profile_container">
                            
                                <div className="img_section">
                                    <img className="background_photo" src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="bg_photo" />
                                    {user.avatar ? (
                                        <Avatar style={{width: "150px", height: "150px", border: "5px solid white", position: "absolute", marginTop: "100px" }} alt="profile_avatar" src={user.avatar.url}  />

                                    ) : (
                                        <img className="display_pic" src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="dp" /> 
                                    )}
                                    
                                </div>
                                <div className="full_name">
                                    <span className="first_name">{user.firstName}</span>
                                    <span className="last_name">{user.lastName}</span>
                                </div>
                                <div className="user_property_section">
                                    <div className="user_details">
                                        <h2 className="user_info">User Information</h2>
                                        <span onClick={() => setOpenFollowersBox(true)} className="info"><strong>Followers</strong>  : {user.followers ? user.followers.length : 0}</span>
                                        <span onClick={() => setOpenFollowingsBox(true)} className="info"><strong>Followings</strong> : {user.followings ? user.followings.length : 0}</span>
                                        {myPersonalProfile ? null : <span style={{ background: followingUser ? "red" : "" }} onClick={followOrUnFollowUser} className="info">{followingUser ? <strong>unFollow</strong> : <strong>Follow</strong>}</span>}
                                        
                                    </div>
                                    <div className="user_post">
                                        {getUserPost.posts && getUserPost.posts.length > 0 ? getUserPost.posts.map((EachPostOfUser) => (
                                            <Post key={EachPostOfUser._id} post={EachPostOfUser} loading={loading} />
                                        )) : <p>User have no post yet.</p>}
                                    </div>
                                </div>
                            
                        {user.followers ? ( 
                            <>
                                <Dialog open={openFollowersBox} onClose={() => setOpenFollowersBox(false)}>
                                    <div className="dialog_box">
                                        <div className="dialog_box_header">
                                            <h3 style={{marginBottom : "10px"}}>Followers</h3>
                                            <Cancel onClick={() => setOpenFollowersBox(false)} />
                                        </div>
                                        
                                        {user.followers.length > 0 ? (
                                            user.followers.map((eachFollower) => (
                                                <Users key={eachFollower._id} userName={eachFollower.userName} userDp={eachFollower.avatar.url} userId={eachFollower._id} />
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
                                        
                                        {user.followings.length > 0 ? (
                                            user.followings.map((eachFollowing) => (
                                                <Users key={eachFollowing._id} userName={eachFollowing.userName} userDp={eachFollowing.avatar.url} userId={eachFollowing._id}  />
                                            ))
                                        ) : <p style={{marginTop : "10px"}}>No followings yet</p>}
                                        
                                    </div>
                                </Dialog>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    )
}

export default UserAccont
