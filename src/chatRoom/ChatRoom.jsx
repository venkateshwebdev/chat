import { useEffect, useRef, useState } from "react";
import "./chatroom.css"
import { getDoc,addDoc,doc, collection, Timestamp, serverTimestamp, getDocs, onSnapshot,query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import { async } from "@firebase/util";
const ChatRoom = () => {
    const [message,setMessage] = useState("")
    const [dummy,setDummy] = useState(0)
    const [messageList,setMessageList] = useState()

    const messageRef = useRef(null)
    const dataref = collection(db,"messages")
    const q = query(dataref,orderBy('createdAt'))
    useEffect(()=>{
        const getData = async()=>{
            const data = await getDocs(q)
            const dataList = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
            setMessageList(dataList)
            console.log(dataList);
            console.log(messageList)
        }
        getData()
    },[dummy])

    const handleMessage = async(e)=>{
        e.preventDefault()
        const dataObj = {
            message : message,
            createdAt:serverTimestamp(),
            username : auth.currentUser.displayName,
            time:Date.now()
        }
        await addDoc(dataref,dataObj)
        setMessage("")
        setDummy((prev)=>prev+1)
    }

    const createMessage = (e)=>{
        return (
            <Message key = {e.id} message={e.message} cd={e.time} username={e.username}  />
        )
    }
    return ( 
        <div className="cr-container">
            <div className="cr-nav"></div>
            <div className="cr-main">
                {messageList?.map((e)=>createMessage(e))}
            </div>
            <div className="cr-foot">
                <form onSubmit={handleMessage}>
                    <input className="sendinput" placeholder="Type a Message.." type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
                    <button className="sendbutton" type="submit">➤</button>
                </form>
            </div>
        </div>
     );
}
 
export default ChatRoom;