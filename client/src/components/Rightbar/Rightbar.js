import "./rightbar.css"

const Rightbar = () => {
    return (
        <div>
            <div className="rightbar">
                <div className="notificaton_wrapper">
                    <span className="notifaction"><strong>Hari</strong> and <strong>2 other</strong> have birthday today.</span>
                    <span className="notifaction"><b>Pawan</b> likes your post.</span>
                    <span className="notifaction"><b>Sabitri</b> started following you.</span>
                    
                </div>
                <button className="show_more_btn">Show More</button>
                {/* <Button size="small" color="secondary" variant="contained" >Show More</Button> */}
            </div>
        </div>
    )
}

export default Rightbar
