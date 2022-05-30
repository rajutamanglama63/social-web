import {RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School} from '@material-ui/icons'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import Users from '../Users/Users'
import { allUsersList } from '../../redux/actions/allUsersAction'
import "./sidebar.css"

const Sidebar = () => {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)


    useEffect(() => {
        dispatch(allUsersList());
    }, [dispatch])
    return (
        <div>
            <div className="sidebar">
                <div className="sidebar_wrapper">
                    <ul className="sidebar_list">
                        <li className="sidebar_list_item">
                            <RssFeed className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Feed</span>
                        </li>
                        <li className="sidebar_list_item">
                            <Chat className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Chat</span>
                        </li>
                        <li className="sidebar_list_item">
                            <PlayCircleFilledOutlined className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Video</span>
                        </li>
                        <li className="sidebar_list_item">
                            <Group className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Groups</span>
                        </li>
                        <li className="sidebar_list_item">
                            <Bookmark className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Bookmarks</span>
                        </li>
                        <li className="sidebar_list_item">
                            <HelpOutline className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Questions</span>
                        </li>
                        <li className="sidebar_list_item">
                            <WorkOutline className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Jobs</span>
                        </li>
                        <li className="sidebar_list_item">
                            <Event className="sidebar_icon" />
                            <span className="sidebar_list_item_name">Events</span>
                        </li>
                        <li className="sidebar_list_item">
                            <School className="sidebar_icon" />
                            <span className="sidebar_list_item_name">School</span>
                        </li>
                    </ul>
                    <hr className="horizantal_line" />
                    <span className="friend_list">All Users</span>
                    {allUsers.loading === false ? allUsers.users.map((user) => (
                                <Users key={user._id} userId={user._id} userName={user.userName} userDp={user.avatar ? user.avatar.url : null} />
                    )) : <span>No user to show</span>}
                    
                    {/* <ul className="sidebar_friend_list">
                        {allUsers.loading === false ? allUsers.users.map((user) => (
                            <li className="sidebar_friend_list_item" key={user._id} onClick={() => navigateToProfile(user._id)}>
                                <Users userName={user.userName} />
                            </li>
                        )) : <span>No user to show</span>}
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
