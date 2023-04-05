import { collection, deleteDoc, doc, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./chatroom.css"
const Message = (props) => {
    const [userSide,setUserSide] = useState("")
    const [del,setdel] = useState(false)

    // const doc = collection(db,"messages")
    useEffect(()=>{
        if(props.username==auth.currentUser.displayName){
            setUserSide("right")
        }
    },[])
    // const createModal=(props)=>{
    //     return(
    //         <div className="modal-container">
    //             <h3>Do you Want to Delete this message permanentley?</h3>
    //             <div><button>Cancel</button><button onClick={handleMessageDelete(props.e)}>Delete</button></div>
    //             {console.log("modalcreated")}   
    //         </div>
    //     )
    // }
    const handleMessageDelete = async(e)=>{
        await deleteDoc(doc(db,"messages",e.target.id))
    }
    // const handleDeleteModal = (e)=>{
    //     {console.log("modal Started")}
    //     return(
    //         <createModal e={e}/>
    //     )

    // }
    const rtime = new Date(props.cd)
    return (
        <div className={`message-container ${userSide}`}>
            <div className="mobile"> 
            <div id={props.id} onMouseOver={handleMessageDelete} className={`message-main ${userSide}s`}>{props.message}</div>
            </div>
            <div className="laptop">
            <div id={props.id} onClick={handleMessageDelete} className={`message-main ${userSide}s`}>{props.message}</div>
            </div>
            <div className="date">{rtime.toString().slice(0,21)}</div>
        </div>
     );
}
 
export default Message;