import Loading from "../Loading/Loading"
import Post from "../Post/Post"
import "./feed.css"

const Feed = ({posts, loading}) => {
    return loading ? (<Loading />) : (
            <div>
                <div className="feed">
                    {posts && posts.length > 0 ? posts.map((post) => (
                        <Post key={post._id} post={post} />
                    )) : <div className="feed">No posts yet</div>}
                </div>
            </div>
        )
}

export default Feed
