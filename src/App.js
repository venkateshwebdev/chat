import "./App.css"
import Auth from "./Auth";
import Cookies from "universal-cookie";
import ChatRoom from "./chatRoom/ChatRoom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalContext from "./modalcontext";
import { BrowserRouter } from "react-router-dom";
import Chats from "./chatRoom/Chats";
const cookies = new Cookies()
const App = () => {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [modal,setModal] = useState(false)
  const [cRoom,setCRoom] = useState(false)
  const [delId,setDelId] = useState("")
  const [uid,setUid] = useState(""); 
  const [isSet,setIsSet] = useState(false)
  if(!isAuth){
    return <Auth setIsAuth={setIsAuth} />
  }
  return(
    <BrowserRouter>
    <ModalContext.Provider value={{modal,setModal,delId,setDelId,uid,setUid,cRoom,setCRoom,isSet,setIsSet}}>
    <div className={ ` model ${modal&&"modal"}`}>
      <Modal />
    </div>
    <div className={ ` chetRoom ${cRoom&&"chatRoom"}`}>
      <ChatRoom />
    </div>
    {!(cRoom)&&<Chats />}
    </ModalContext.Provider>
    </BrowserRouter>
  )
}
 
export default App;