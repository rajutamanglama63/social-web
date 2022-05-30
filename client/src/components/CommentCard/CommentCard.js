import { Delete } from '@material-ui/icons'
import {useSelector, useDispatch} from 'react-redux'
import { deleteComment } from '../../redux/actions/commentAction'
import { getPostsOfFollowings } from '../../redux/actions/postAction'
import './commentCard.css'

const CommentCard = ({commentId, postID, comment, username, userIdOfCommenter}) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const commentDeleteHandler = async (idOfPost, idOfComment) => {
        await dispatch(deleteComment(idOfPost, idOfComment))
        dispatch(getPostsOfFollowings())
    }
    
    return (
        <div>
            <div className="comment_card">
                <div className="commenter_comment">
                    <div className="identity_section">
                        <img src="https://images.pexels.com/photos/11341064/pexels-photo-11341064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="commenter_dp" alt="dp" />
                        <span className="commenter_name">{username}</span>
                        {auth._id === userIdOfCommenter ? (
                            <Delete onClick={() => commentDeleteHandler(postID, commentId)} style={{color : "red"}} fontSize="small" />
                        ) : null}
                    </div>
                    <span className="comment_text">{comment}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
