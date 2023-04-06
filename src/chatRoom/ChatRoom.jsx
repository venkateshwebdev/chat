import { useContext, useEffect, useRef, useState } from "react";
import "./chatroom.css"
import { getDoc,addDoc,doc, collection, Timestamp, serverTimestamp, getDocs, onSnapshot,query, orderBy, setDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import { async } from "@firebase/util";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import Auth from "../Auth";
import ModalContext from "../modalcontext";
const cookies = new Cookies()
const ChatRoom = () => {
    const cont = useContext(ModalContext)
    const [message,setMessage] = useState("")
    const [dummy,setDummy] = useState(0)
    const [messageList,setMessageList] = useState()
    const messageRef = useRef(null)
    const dataref = collection(db,"messages")
    const q = query(dataref,where("sender","==",auth.currentUser.displayName),orderBy('createdAt'))
    const navigate = useNavigate()
    // useEffect(()=>{
    //     const getData = async()=>{
    //         const data = await getDocs(q)
    //         const dataList = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    //         setMessageList(dataList)
    //         console.log(dataList);
    //         console.log(messageList)
    //     }
    //     getData()
    // },[dummy])
    useEffect(()=>{
        onSnapshot(q,(snap)=>{
            const dataList = snap.docs.map((doc)=>({...doc.data(),id:doc.id}))
            setMessageList(dataList)
        })
    },[])

    const handleMessage = async(e)=>{
        e.preventDefault()
        const dataObj = {
            message : message,
            createdAt:serverTimestamp(),
            username : auth.currentUser.displayName,
            time:Date.now(),
            sender:auth.currentUser.email,
            receiver:cont.uid
        }
        await addDoc(dataref,dataObj)
        setMessage("")
        setDummy((prev)=>prev+1)
    }
    const createMessage = (e)=>{
        return (
            <Message key = {e.id} id={e.id} message={e.message} cd={e.time} username={e.username} sender={e.sender}  />
        )
    }
    const handleLogout = ()=>{
        cont.setCRoom(false)
    }
    return ( 
        <div className="cr-container">
            <div className="cr-nav">
                <div className="nav-nav">
                    <img src={"https://cdn.vectorstock.com/i/preview-1x/11/69/blank-avatar-profile-picture-vector-45161169.jpg"} alt="👤"/>
                    {cont.uid}
                </div>
                <div className="y"><button className="sendbutton x" onClick={handleLogout}>Back.</button></div>
                </div>
            <div className="cr-main">
                {messageList?.map((e)=>createMessage(e))}
            </div>
            <div className="cr-foot">
                <form className="chatroomform" onSubmit={handleMessage}>
                    <input className="sendinput" placeholder="Type a Message.." type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
                    <button className="sendbutton" type="submit">➤</button>
                </form>
            </div>
        </div>
     );
}
 
export default ChatRoom;