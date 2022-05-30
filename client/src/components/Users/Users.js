import { Link} from 'react-router-dom'
import {Avatar} from '@material-ui/core'
import './users.css'

const Users = ({userName, userId, userDp}) => {
    const link = `/user/${userId}`
    return (
        <div>
            <div className="user" >
                <Link to={link} className="link_to_profile">
                <Avatar style={{width: "32px", height: "32px"}} alt="profile_avatar" src={userDp}  />
                    {/* {userDp ? (
                                        <Avatar style={{width: "32px", height: "32px"}} alt="profile_avatar" src={userDp}  />
                                    ) : (
                                        <img className="display_pic" src="https://images.pexels.com/photos/2872667/pexels-photo-2872667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="dp" /> 
                                    )
                    } */}
                    {/* <img className="picture" src="https://images.pexels.com/photos/2872667/pexels-photo-2872667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="jhalak" /> */}
                    <span className="user_name">{userName}</span>
                </Link>
            </div>
        </div>
    )
}

export default Users
