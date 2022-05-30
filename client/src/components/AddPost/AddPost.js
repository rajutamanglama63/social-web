import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from "react-alert"
import {addNewPost} from "../../redux/actions/addNewPost"
import "./addPost.css"

const AddPost = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const addLatestPost = useSelector(state => state.addPost)
    const [addPost, setAddPost] = useState({
        caption : "",
        image : null
    })

    const imageSelector = (e) => {
        const file = e.target.files[0]

        const Reader = new FileReader()
        Reader.readAsDataURL(file)

        Reader.onload = () => {
            // basically FileReader method have 3 
            // different state and they are initialState = 0, processingState = 1, readyState = 2
            if(Reader.readyState === 2){
                // Reader.result will actually read the url path of pic which we have choose from our machine
                setAddPost({...addPost, image : Reader.result})
            }
        }

    }

    const postSubmitHandler = async (e) => {
        e.preventDefault()

        await dispatch(addNewPost(addPost.caption, addPost.image))

        
        setAddPost({
            caption : "",
            image : null
        })

    }

    useEffect(() => {
        if(addLatestPost.msg) {
            alert.show(addLatestPost.msg)
        }
    }, [alert, addLatestPost.msg])

    return (
        <div>
            <div className="add_post_box">
                <div className="add_post_box_container">
                    <h1 className="add_post_header">Add Post</h1>
                    <form className="add_post_form" onSubmit={postSubmitHandler}>
                        <input 
                         className="add_post_input_field" 
                         placeholder="caption" 
                         type="text" 
                         value={addPost.caption}
                         onChange={(e) => setAddPost({...addPost, caption : e.target.value})}
                        />
                        <input 
                         className="add_post_input_field" 
                         accept="image/*" 
                         type="file" 
                         onChange={imageSelector}
                        /> 
                        {addPost.image && <img src={addPost.image} className="post_image" alt="post_image" />}
                        <button type="submit" className="add_post_btn">Add Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost
