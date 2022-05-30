import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useState} from 'react'
import { Avatar } from '@material-ui/core';
import "./register.css"
import { userRegistration } from "../../redux/actions/authActions"

const Register = () => {
    const dispatch = useDispatch()
    const [newUserData, setNewUserData] = useState({
        userName : "",
        email : "",
        password : "",
        lastName : "",
        firstName : "",
        avatar : null,
    })

    const avatarSelector = (e) => {
        const file = e.target.files[0]

        const Reader = new FileReader()
        Reader.readAsDataURL(file)

        Reader.onload = () => {
            // basically FileReader method have 3 
            // different state and they are initialState = 0, processingState = 1, readyState = 2
            if(Reader.readyState === 2){
                // Reader.result will actually read the url path of pic which we have choose from our machine
                setNewUserData({...newUserData, avatar : Reader.result})
            }
        }

    }

    const registerHandler = async (e) => {
        e.preventDefault()
        await dispatch(userRegistration(newUserData))
        setNewUserData({
            userName : "",
            email : "",
            password : "",
            lastName : "",
            firstName : "",
            avatar : null,
        })
    }
    return (
        <div>
            <div className="register_box">
                <div className="register_box_container">
                    <h1 className="register_header">Social Web</h1>
                    <h3 className="register_info">Sign up to share your thoughts and photos</h3>
                    <form className="register_form" onSubmit={registerHandler}>
                        <Avatar alt="profile_avatar" src={newUserData.avatar} sx={{ width: "100px", height: "100px" }} />
                        <input 
                         className="form_input_field" 
                         accept="image/*" 
                         type="file" 
                         onChange={avatarSelector}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="username" 
                         type="text" 
                         value={newUserData.userName}
                         onChange={(e) => setNewUserData({...newUserData, userName : e.target.value})}
                        />
                        <input 
                         className="form_input_field" 
                         placeholder="firstname" 
                         type="text" 
                         value={newUserData.firstName}
                         onChange={(e) => setNewUserData({...newUserData, firstName : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="lastname" 
                         type="text" 
                         value={newUserData.lastName}
                         onChange={(e) => setNewUserData({...newUserData, lastName : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="email" 
                         type="text" 
                         value={newUserData.email}
                         onChange={(e) => setNewUserData({...newUserData, email : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="password" 
                         type="text" 
                         value={newUserData.password}
                         onChange={(e) => setNewUserData({...newUserData, password : e.target.value})}
                        />
                        <button type="submit" className="register_btn">Register</button> 
                        <p className="assuring">By signing up, you agree with our Terms, Data, Policy and Privacy policy</p>
                    </form>
                </div>
                <div className="link_box">
                    <p>Have an account? <Link to="/" className="login_link">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register
