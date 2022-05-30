import Sidebar from "../../components/Sidebar/Sidebar"
import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"
import { getPostsOfFollowings } from "../../redux/actions/postAction"
import "./home.css"

import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import {useEffect} from "react"
// import { loadUser } from "../../redux/actions/userAction"

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    
    const postLike = useSelector(state => state.likePost)
    const comment = useSelector(state => state.comment)
    // we are collecting all posts of people whom we have followed
    const getAllPostsOfFollowing = useSelector(state => state.posts)
    const {posts, loading} = getAllPostsOfFollowing;



    useEffect(() => {
        dispatch(getPostsOfFollowings());
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

    }, [alert, postLike.error, postLike.msg, comment.commentStatusMsg, comment.error])


    return (
        <div>
            <div className="home">
                <div className="home_container">
                    <Sidebar />
                    <Feed posts={posts} loading={loading} />
                    {/* {posts && posts.length === 0 ? (<div className="feed">No posts yet</div>) : <Feed posts={posts} />} */}
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}

export default Home
