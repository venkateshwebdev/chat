import "./App.css"
import Auth from "./Auth";
import Cookies from "universal-cookie";
import ChatRoom from "./chatRoom/ChatRoom";
import { useEffect, useState } from "react";
const cookies = new Cookies()
const App = () => {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)
  if(!isAuth){
    return <Auth setIsAuth={setIsAuth} />
  }
  return(
    <>
    <ChatRoom />
    </>
  )
}
 
export default App;