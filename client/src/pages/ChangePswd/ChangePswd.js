import React, {useEffect, useState} from 'react'
// import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import { changePswd } from '../../redux/actions/changePswdAction'
import './changePswd.css'

const ChangePswd = () => {
    // const authenticatedUser = useSelector(state => state.auth)
    const changeThePassword = useSelector(state => state.pswdChange)
    const alert = useAlert()
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const [changePassword, setChangePassword] = useState({
        oldPassword : "",
        newPassword : ""
    })

    const submitChangePswdHandler = async(e) => {
        e.preventDefault()
        setChangePassword({
            oldPassword : "",
            newPassword : ""
        })
        await dispatch(changePswd(changePassword.oldPassword, changePassword.newPassword))

        // if(changeThePassword.success === true) {
        //     navigate('/profile')
        // }
    }

    useEffect(() => {
        if(changeThePassword.error) {
            alert.error(changeThePassword.error)
        }
        if(changeThePassword.msg) {
            alert.success(changeThePassword.msg)
        }
    }, [alert, changeThePassword.error, changeThePassword.msg])
    return (
        <div>
            <div className="change_pswd_box">
                <div className="change_pswd_box_container">
                    <h1 className="change_pswd_header">Social Web</h1>
                    {/* <span style={{color : "red", margin : "5px 0", textAlign : "center", fontSize : "small"}}>{authenticatedUser.error}</span> */}
                    <form className="change_pswd_form" onSubmit={submitChangePswdHandler}>
                        <input 
                         className="form_input_field" 
                         placeholder="Old Password" 
                         type="text" 
                         value={changePassword.oldPassword}
                         onChange={(e) => setChangePassword({...changePassword, oldPassword : e.target.value})}
                        />
                        <input 
                         className="form_input_field" 
                         placeholder="New Password" 
                         type="text" 
                         value={changePassword.newPassword}
                         onChange={(e) => setChangePassword({...changePassword, newPassword : e.target.value})}
                        />
                        <button type="submit" disabled={changeThePassword.loading === true} className="change_pswd_btn">Change Password</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePswd
