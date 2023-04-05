import "./App.css"
import Auth from "./Auth";
import Cookies from "universal-cookie";
import ChatRoom from "./chatRoom/ChatRoom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalContext from "./modalcontext";
const cookies = new Cookies()
const App = () => {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)
  const [modal,setModal] = useState(false)
  const [isDelete,setIsDelete] = useState(false)
  const [delId,setDelId] = useState("")
  if(!isAuth){
    return <Auth setIsAuth={setIsAuth} />
  }
  return(
    <ModalContext.Provider value={{modal,setModal,delId,setDelId}}>
    <div className={ ` model ${modal&&"modal"}`}>
      <Modal />
    </div>
    <ChatRoom />
    </ModalContext.Provider>
  )
}
 
export default App;