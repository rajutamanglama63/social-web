import {Home, Add, Search, AccountCircle, ExitToApp, Cancel, } from '@material-ui/icons'
import "./drawer.css"

const Drawer = ({open, handleClose}) => {
    const SideDrawerClass = ["side-drawer"];

    if(open) {
        SideDrawerClass.push("show");
    }
    return (
        <div>
            <div className={SideDrawerClass.join(" ")}>
                {/* <Drawer anchor="right" variant="persistent" open={open} hideBackdrop="true"> */}
                    <ul className="drawer_list">
                    
                        <li className="drawer_list_item">
                            <AccountCircle className="drawer_list" />
                            <span className="drawer_list_item_name">Add content</span>
                        </li>
                        <li className="drawer_list_item">
                            <Home className="drawer_list" />
                            <span className="drawer_list_item_name">Home</span>
                        </li>
                        <li className="drawer_list_item">
                            <Add className="drawer_list" />
                            <span className="drawer_list_item_name">Add content</span>
                        </li>
                        <li className="drawer_list_item">
                            <Search className="drawer_list" />
                            <span className="drawer_list_item_name">Search</span>
                        </li>
                        <li className="drawer_list_item">
                            <ExitToApp className="drawer_list" />
                            <span className="drawer_list_item_name">Logout</span>
                        </li>
                        <li className="drawer_list_item">
                            <Search className="drawer_list" />
                            <span className="drawer_list_item_name">Search</span>
                        </li>
                        <li className="drawer_list_item" onClick={handleClose} >
                            <Cancel className="drawer_list"/>
                            <span className="drawer_list_item_name">Cancel</span>
                        </li>
                    </ul>
                {/* </Drawer> */}
            </div>
        </div>
    )
}

export default Drawer
