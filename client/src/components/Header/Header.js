import "./header.css"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {logout} from "../../redux/actions/authActions"
import {Home, Add, Search, AccountCircle, ExitToApp, Menu, Cancel, } from '@material-ui/icons'
// import Drawer from "../Drawer/Drawer"

const Header = ({open, handleOpen, handleClose}) => {
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    // const navigateProfile = () => {
    //     navigate("/profile")
    // }

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            <div className="navbar">
                <div className="navbar_container">
                    <div className="navbar_left">
                        <h3 className="logo">Social Web</h3>
                    </div>
                    <div className="navbar_center">
                        <ul className="navbar_list">
                            <li className="navbar_list_item">
                                <Link to="/">
                                    <Home fontSize="medium" className="navbar_icon" />
                                </Link>
                            </li>
                            <li className="navbar_list_item">
                                <Link to="/add">
                                    <Add fontSize="medium" className="navbar_icon" />
                                </Link>
                            </li>
                            <li className="navbar_list_item">
                                <Link to="/search">
                                    <Search fontSize="medium" className="navbar_icon" />
                                </Link>
                            </li>
                            <li className="navbar_list_item">
                                <Link to="/profile">
                                    <AccountCircle fontSize="medium" className="navbar_icon" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar_right">
                        <div className="user" onClick={logoutHandler}>
                            {/* <img src="https://images.pexels.com/photos/11389730/pexels-photo-11389730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="user_pic" alt="user_pic" /> */}
                            <p className="username">Logout</p>
                            <span className="logout"><ExitToApp fontSize="medium" /></span>
                        </div>
                        <div className="hamburger_menubar">
                        {/* <Menu fontSize="large" onClick={handleOpen}/> */}
                            {!open ? (
                                        <>
                                            <Menu fontSize="large" onClick={handleOpen}/>
                                        </>
                                    ) : (
                                            <>
                                                <Cancel onClick={handleClose} />
                                            </>
                                        )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
