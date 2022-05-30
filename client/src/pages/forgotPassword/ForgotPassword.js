import React, { useState, useEffect } from 'react'
import {useAlert} from 'react-alert'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {passwordForgotten} from '../../redux/actions/forgotPasswordAction'
import './forgotPassword.css'

const ForgotPassword = () => {
    const forgotPassword = useSelector(state => state.forgotPassword)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')


    useEffect(() => {
        if(forgotPassword.msg) {
            alert.success(forgotPassword.msg)
        }
        if(forgotPassword.error) {
            alert.error(forgotPassword.error)
        }
    }, [alert, forgotPassword.msg, forgotPassword.error])

    const tokenSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(passwordForgotten(email))
    }
    return (
        <div>
            <div className="forgot_password_box">
                <div className="forgot_password_box_container">
                    <h1 className="forgot_password_header">Forgot password</h1>
                    <form className="forgot_password_form" onSubmit={tokenSubmitHandler}>
                        <input 
                         className="forgot_password_input_field" 
                         placeholder="enter your email" 
                         type="text" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* {forgotPassword.loading === true ? <button disabled type="submit" className="forgot_password_btn">Send Token</button> : <button type="submit" className="forgot_password_btn">Send Token</button>} */}
                        <button type="submit" className="forgot_password_btn">Send Token</button>
                        <Link to="/reset/password/:token">Reset password</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
