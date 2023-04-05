import { collection, deleteDoc, doc, where } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import ModalContext from "../modalcontext";
import "./chatroom.css"
const Message = (props) => {
    const [userSide,setUserSide] = useState("")
    const [del,setdel] = useState(false)
    const [zone,setZone] = useState("AM")
    const cont = useContext(ModalContext)

    // const doc = collection(db,"messages")
    useEffect(()=>{
        if(props.username==auth.currentUser.displayName){
            setUserSide("right")
        }
    },[])

    const handleMessageDelete = (e)=>{
        if (e.target.classList[1]=="rights"){
            cont.setDelId(e.target.id) 
            cont.setModal(true)
                    
        }
    }
    const deletemsg = async(e)=>{
        await deleteDoc(doc(db,"messages",e.target.id))
    }
    const rtime = new Date(props.cd)
    const hours = rtime.toString().slice(16,18)-12
    const h24 = rtime.toString().slice(16,18)
    return (
        <div className={`message-container ${userSide}`}>
            <div className="mobile"> 
            <div id={props.id} sender={props.sender} onClick={handleMessageDelete} className={`message-main ${userSide}s`}>{props.message}</div>
            </div>
            <div className="laptop">
            <div id={props.id} onClick={handleMessageDelete} className={`message-main ${userSide}s`}>{props.message}</div>
            </div>
            <div className="date">{hours}{rtime.toString().slice(18,21)} {h24>11?"PM":"AM"}</div>
        </div>
     );
}
 
export default Message;



// if (e.target.classList[1]=="rights"){
//     await deleteDoc(doc(db,"messages",e.target.id))
// }

// console.log(e)