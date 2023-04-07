import { collection,onSnapshot } from "@firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { auth, db } from "../firebase"
import ModalContext from "../modalcontext"
import ChatRoom from "./ChatRoom"
import "./chats.css"
const Chats = () => {
    const [usersList,setUsersList] = useState();
    const navigate = useNavigate();
    const cont = useContext(ModalContext)
    const dataref = collection(db,"users")
    useEffect(()=>{
        const getData = async()=>{
            await onSnapshot(dataref,(snap)=>{
                const data = snap.docs.map((e)=>({...e.data(),id:e.id}))
                setUsersList(data)
            })
        }
        getData()
    },[])

    const Chatcard = (props)=>{
        const handleClick = ()=>{
            cont.setUid(props.id)
            cont.setCRoom(true)
            cont.setIsSet(true)
        }
        return(
            <div className="chart-cc" onClick={handleClick} id={props.id}>
                <div className="cx"><div className="char-cc-icon"><img src="https://cdn.vectorstock.com/i/preview-1x/11/69/blank-avatar-profile-picture-vector-45161169.jpg" /></div>
                <div className="char-cc-content">
                <div className="char-cc-name">{props.username}</div>
                <div className="char-cc-lastm">You:That's Fine👍</div></div>
                </div>
                <div className="char-cc-lastmt">3:24 pm</div>
            </div>
        )
    }
    const createCard = (e)=>{
        return(
            !(auth.currentUser.email===e.id)&&<Chatcard username={e.id} id={e.id} />
        )
        
    }
    return ( 
        <div className="chat-container">
            <div className="chat-nav">{auth?.currentUser?.displayName}</div>
            <div className="chat-main">
                {usersList?.map((e)=>(createCard(e)))}
            </div>
            <div className="chat-foot"></div>
        </div>
     );
}
 
export default Chats;
