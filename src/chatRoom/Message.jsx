import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./chatroom.css"
const Message = (props) => {
    const [userSide,setUserSide] = useState("")
    useEffect(()=>{
        if(props.username==auth.currentUser.displayName){
            setUserSide("right")
        }
    },[])
    return (
        <div className={`message-container ${userSide}`}>
            <div className={`message-main ${userSide}s`}>{props.message}</div>
            <div className="date">{props.createdAt}</div>
            <div className="user">{props.username}</div>
        </div>
     );
}
 
export default Message;