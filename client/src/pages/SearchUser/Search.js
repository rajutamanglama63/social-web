import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Users from '../../components/Users/Users'
import { allUsersList } from '../../redux/actions/allUsersAction'
import "./search.css"

const Search = () => {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    const [searchTerm, setSearchTerm] = useState("")

   
    // useEffect(() => {
    //     allUsersList(searchTerm)
        
    // }, [dispatch, searchTerm])

    const searchSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(allUsersList(searchTerm))
        setSearchTerm("")
    }

    return (
        <div className="search">
            <div className="search_container">
                <h2 style={{textAlign : 'center'}}>Search User</h2>
                <form className="search_form" onSubmit={searchSubmitHandler} >
                    <input 
                     className="input_field" 
                     placeholder="search user" 
                     type="text"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search_btn" type='submit'>Search</button>
                    <div className="appreance_of_users">
                    {allUsers.users.map((user) => (
                        <Users key={user._id} userId={user._id} userName={user.userName} userDp={user.avatar ? user.avatar.url : null} />   
                    ))}
                </div>
                </form>
                {/* <div className="appreance_of_users">
                    {allUsers.users.map((user) => (
                        <Users key={user._id} userId={user._id} userName={user.userName} userDp={user.avatar ? user.avatar.url : null} />
                        
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default Search
