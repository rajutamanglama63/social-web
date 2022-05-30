import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import {Link, useParams} from 'react-router-dom'
import { passwordReset } from '../../redux/actions/pswdResetAction'
import './resetPswd.css'

const ResetPswd = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()
    const resetPswd = useSelector(state => state.resetPswd)
    const [resetPassword, setResetPassword] = useState("")

    const submitResetPswdHandler = (e) => {
        e.preventDefault()
        dispatch(passwordReset(params.token, resetPassword))
        setResetPassword("")
    }

    useEffect(() => {
        if(resetPswd.msg) {
            alert.success(resetPswd.msg)
        }
        if(resetPswd.error) {
            alert.error(resetPswd.error)
        }
    }, [alert, resetPswd.msg, resetPswd.error])
    return (
        <div>
            <div className="reset_pswd_box">
                <div className="reset_pswd_box_container">
                    <h1 className="reset_pswd_header">Social Web</h1>
                    {/* <span style={{color : "red", margin : "5px 0", textAlign : "center", fontSize : "small"}}>{authenticatedUser.error}</span> */}
                    <form className="reset_pswd_form" onSubmit={submitResetPswdHandler}>
                        
                        <input 
                         className="form_input_field" 
                         placeholder="New Password" 
                         type="text" 
                         value={resetPassword}
                         onChange={(e) => setResetPassword(e.target.value)}
                        />
                        <button type="submit" className="reset_pswd_btn">Reset Password</button> 
                        <Link to="/">Go to login</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPswd
