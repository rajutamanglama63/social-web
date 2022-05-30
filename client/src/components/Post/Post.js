import { Delete, Edit, FavoriteBorder, Favorite, Forum , Cancel} from '@material-ui/icons'
import {Dialog, Button} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'

import "./post.css"
import { likePost } from '../../redux/actions/likePostAction'
import { getPostsOfFollowings } from '../../redux/actions/postAction'
import { commentOnPost} from '../../redux/actions/commentAction'
import CommentCard from '../CommentCard/CommentCard'
import Users from '../Users/Users'
import { getMyPosts } from '../../redux/actions/getMyPostsAction'
import { deletePost } from '../../redux/actions/deletePost'
import { editPost } from '../../redux/actions/editPost'
import { getOtherIndividualUserPost } from '../../redux/actions/getUserPostAction'


const Post = ({post}) => {
    const params = useParams()
    const dispatch = useDispatch()
    const authenticatedUser = useSelector(state => state.auth)
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState("")
    const [postEdit, setPostEdit] = useState(post.caption)
    const [openCommentBox, setOpenCommentBox] = useState(false)
    const [openLikeBox, setOpenLikeBox] = useState(false)
    const [openEditBox, setOpenEditBox] = useState(false)
    const postClass = ["post"];

    if(params.profile) {
        postClass.push("profile_post");
    }

    const handleLike = async () => {
        setLike(!like);
        await dispatch(likePost(post._id))
        
        if(authenticatedUser._id){
            dispatch(getMyPosts())
        }
        
        if(authenticatedUser._id !== post._id){
            dispatch(getPostsOfFollowings())
        }

        if(authenticatedUser._id !== post._id){
            dispatch(getOtherIndividualUserPost())
        }
    }

    const commentSubmitHandler = async (e) => {
        e.preventDefault()
        await dispatch(commentOnPost(post._id, comment))
        dispatch(getPostsOfFollowings())
        setComment("")
    }

    const editPostSubmitHandler = async (e) => {
        e.preventDefault()
        await dispatch(editPost(postEdit, post._id))
        dispatch(getMyPosts())
    }

    const deletePostHandler = async (id) => {
        await dispatch(deletePost(id))
        dispatch(getMyPosts())
    }


    useEffect(() => {
        post.likes.forEach(item => {
            if(authenticatedUser._id === item._id) {
                setLike(true);
            }
        });
    }, [authenticatedUser._id, post.likes]) 

    return (
        <div>
            <div className={postClass.join(" ")}>
                <div className="post_wrapper">
                    <div className="post_top">
                        <div className="post_top_left_corner">
                            <img className="user_photo" src={post.user.avatar.url} alt="user_photo" />
                            <span className="user_fullname">{post.user.userName}</span>
                        </div>
                        {authenticatedUser._id === post.user._id ? (
                            <div className="post_top_right_corner">
                                <Edit onClick={() => setOpenEditBox(true)} fontSize="small" />
                                <Delete onClick={() => deletePostHandler(post._id)} fontSize="small" color="secondary" />
                            </div>
                        ) : null}
                        
                    </div>
                    <div className="post_center">
                        <span className="caption">{post.caption}</span>
                        <img className="post_picture" src={post.image.url} alt="post_picture" />
                    </div>
                    <div className="post_bottom">
                        <div className="post_bottom_left_corner">
                            <div className="like" onClick={handleLike}>
                                {like ? <Favorite fontSize="small" style={{color : "red"}}/> : <FavoriteBorder fontSize="small" />}
                                
                            </div>
                            <span className="like_count" onClick={() => setOpenLikeBox(true)}>{post.likes.length} {post.likes.length > 1 ? (<p style={{marginLeft : "5px"}}>Likes</p>) : (<p style={{marginLeft : "5px"}}>Like</p>)}</span>
                        </div>
                        <div className="post_bottom_right_corner">
                            <div className="comment">
                                <span className="comment_count">{post.comments.length}</span>
                                <Forum fontSize="small" onClick={() => setOpenCommentBox(true)} />
                            </div>
                        </div>
                    </div>
                    <Dialog open={openCommentBox} onClose={() => setOpenCommentBox(false)}>
                        <div className="dialog_box">
                            <div className="dialog_box_header">
                                <h3>Comments</h3>
                                <Cancel onClick={() => setOpenCommentBox(false)} />
                            </div>
                            <form onSubmit={commentSubmitHandler}>
                                <input 
                                    type="text" 
                                    className="form_input_field" 
                                    placeholder="enter your comment..." 
                                    required
                                    value={comment} 
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button type="submit" color="secondary" size="small" variant="contained">Add</Button>
                            </form>
                            {post.comments.length > 0 ? (
                                post.comments.map((eachComment) => (
                                    <CommentCard key={eachComment._id} postID={post._id} commentId={eachComment._id} comment={eachComment.comment} username={eachComment.user.userName} userIdOfCommenter={eachComment.user._id} />
                                ))
                            ) : <p style={{marginTop : "10px"}}>No comment yet</p>}
                            
                        </div>
                    </Dialog>

                    {/* dialog box for viewing likers */}
                    <Dialog open={openLikeBox} onClose={() => setOpenLikeBox(false)}>
                        <div className="dialog_box">
                            <div className="dialog_box_header">
                                <h3 style={{marginBottom : "10px"}}>People who like this post</h3>
                                <Cancel onClick={() => setOpenLikeBox(false)} />
                            </div>
                            
                            {post.likes.length > 0 ? (
                                post.likes.map((eachLiker) => (
                                    <Users key={eachLiker._id} userName={eachLiker.userName} />
                                ))
                            ) : <p style={{marginTop : "10px"}}>No likes yet</p>}
                            
                        </div>
                    </Dialog>

                     {/* dialog box for editing post */}
                     <Dialog open={openEditBox} onClose={() => setOpenEditBox(false)}>
                        <div className="dialog_box">
                            <div className="dialog_box_header">
                                <h3 style={{marginBottom : "10px"}}>Edit Post</h3>
                                <Cancel onClick={() => setOpenEditBox(false)} />
                            </div>
                            <form onSubmit={editPostSubmitHandler}>
                                <input 
                                 className="form_input_field" 
                                 placeholder="caption" 
                                 type="text" 
                                 value={postEdit}
                                 onChange={(e) => setPostEdit(e.target.value)}
                                />
                                <Button type="submit" color="secondary" size="small" variant="contained">Edit</Button>
                            </form>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        
    )
}

export default Post
