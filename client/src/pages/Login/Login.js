import { Link, useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../redux/actions/authActions"
import "./login.css"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const authenticatedUser = useSelector(state => state.auth)
    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    });

    const navigateToForgotPswdPage = () => {
        navigate("/forgot/password")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(credentials.email, credentials.password));
        setCredentials({
            email : "",
            password : ""
        });
    }

    useEffect(() => {
        if(authenticatedUser.msg){
            alert.show(authenticatedUser.msg)
        }
    }, [alert, authenticatedUser.msg])

    return (
        <div>
            <div className="login_box">
                <div className="login_box_container">
                    <h1 className="login_header">Social Web</h1>
                    <span style={{color : "red", margin : "5px 0", textAlign : "center", fontSize : "small"}}>{authenticatedUser.error}</span>
                    <form className="login_form" onSubmit={submitHandler}>
                        <input 
                         className="form_input_field" 
                         placeholder="email" 
                         type="text" 
                         value={credentials.email}
                         onChange={(e) => setCredentials({...credentials, email : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="password" 
                         type="text" 
                         value={credentials.password}
                         onChange={(e) => setCredentials({...credentials, password : e.target.value})}
                        />
                        <button type="submit" className="login_btn">Login</button> 
                        <p onClick={navigateToForgotPswdPage} className="forgot_password">Forgot Password?</p>
                    </form>
                </div>
                <div className="register_link_box">
                    <p>Don't have an account? <Link to="/register" className="register_link">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
