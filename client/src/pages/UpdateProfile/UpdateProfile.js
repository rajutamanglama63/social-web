import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { Avatar } from '@material-ui/core';
import "./updateProfile.css"
import { profileUpdate } from "../../redux/actions/udateProfileAction";
import { loadUser } from "../../redux/actions/authActions"

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authenticatedUser = useSelector(state => state.auth)
    const updateUserProfile = useSelector(state => state.updateUserProfile)
    const [updateUserData, setUpdateUserData] = useState({
        userName : authenticatedUser.userName,
        email : authenticatedUser.email,
        lastName : authenticatedUser.lastName,
        firstName : authenticatedUser.firstName,
        avatar : null,
        prevAvatar : authenticatedUser.avatar.url,
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

                setUpdateUserData({...updateUserData, avatar : Reader.result, prevAvatar : Reader.result})
            }
        }

    }

    const updateProfileHandler = async (e) => {
        e.preventDefault()
        await dispatch(profileUpdate(updateUserData))
        dispatch(loadUser())
        setUpdateUserData({
            userName : "",
            email : "",
            password : "",
            lastName : "",
            firstName : "",
            avatar : null,
            prevAvatar : null,
        })
        navigate('/profile')
    }

    return (
        <div>
            <div className="update_box">
                <div className="update_box_container">
                    <h1 className="update_header">Social Web</h1>
                    <h3 className="update_info">Update Your Profile</h3>
                    <form className="update_form" onSubmit={updateProfileHandler}>
                        <Avatar alt="profile_avatar" src={updateUserData.prevAvatar} sx={{ width: "100px", height: "100px" }} />
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
                         value={updateUserData.userName}
                         onChange={(e) => setUpdateUserData({...updateUserData, userName : e.target.value})}
                        />
                        <input 
                         className="form_input_field" 
                         placeholder="firstname" 
                         type="text" 
                         value={updateUserData.firstName}
                         onChange={(e) => setUpdateUserData({...updateUserData, firstName : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="lastname" 
                         type="text" 
                         value={updateUserData.lastName}
                         onChange={(e) => setUpdateUserData({...updateUserData, lastName : e.target.value})}
                        /> 
                        <input 
                         className="form_input_field" 
                         placeholder="email" 
                         type="text" 
                         value={updateUserData.email}
                         onChange={(e) => setUpdateUserData({...updateUserData, email : e.target.value})}
                        /> 
                        <button disabled={updateUserProfile.loading === true} type="submit" className="update_btn">Update</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile
