import {Routes, Route} from "react-router-dom"
import "./App.css"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import {useSelector, useDispatch} from "react-redux"
import {useState, useEffect} from "react"
import Drawer from "./components/Drawer/Drawer"
import Profile from "./pages/Profile/Profile"
import { loadUser } from "./redux/actions/authActions"
import AddPost from "./components/AddPost/AddPost"
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile"
import ChangePswd from "./pages/ChangePswd/ChangePswd"
import ForgotPassword from "./pages/forgotPassword/ForgotPassword"
import ResetPswd from "./pages/ResetPswd/ResetPswd"
import UserAccont from "./pages/UserAccount/UserAccont"
import Search from "./pages/SearchUser/Search"

const App = () => {
    const authenticatedUser = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            {authenticatedUser.isAuthenticated === true && <Header open={open} handleOpen={handleOpen} handleClose={handleClose} />}
            <Drawer open={open} handleClose={handleClose} />
            <Routes>
                <Route path="/register" element={authenticatedUser.isAuthenticated === true ? <Profile /> : <Register />} />
                <Route path="/" element={authenticatedUser.isAuthenticated === true ? <Home /> : <Login />} />
                <Route path="/profile" element={authenticatedUser.isAuthenticated === true ? <Profile /> : <Login />} />
                <Route path="/update" element={authenticatedUser.isAuthenticated === true ? <UpdateProfile /> : <Login />} />
                <Route path="/add" element={authenticatedUser.isAuthenticated === true ? <AddPost /> : <Login />} />
                <Route path="/changepswd" element={authenticatedUser.isAuthenticated === true ? <ChangePswd /> : <Login />} />
                <Route path="/forgot/password" element={authenticatedUser.isAuthenticated === true ? <ChangePswd /> : <ForgotPassword />} />
                <Route path="/reset/password/:token" element={authenticatedUser.isAuthenticated === true ? <Profile /> : <ResetPswd />} />
                <Route path="/user/:id" element={authenticatedUser.isAuthenticated === true? <UserAccont  /> : <Login />} />
                <Route path="/search" element={authenticatedUser.isAuthenticated === true ? <Search /> : <Login /> } />
            </Routes>
        </div>
    )
}

export default App
