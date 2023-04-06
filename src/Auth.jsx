import "./auth.css"
import { signInWithPopup } from 'firebase/auth'
import {db,auth,provider} from './firebase'
import Cookies from 'universal-cookie'
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, getDocs, query, where,setDoc, onSnapshot } from "@firebase/firestore";
const cookies = new Cookies();
// import google from "./google.png"
const Auth = (props) => {
    const dataref = collection(db,"users")
    const [usersList,setUsersList] = useState();
    const [nickname,setNickname] = useState("");
    const [user,setUser] = useState(false)
    const [p,setP] = useState("");
    const [authToken,setAuthToken] = useState("")
    const inputref = useRef(null)
    useEffect(()=>{
        onSnapshot(dataref,(snap)=>{
            const dataList = snap.docs.map((doc)=>({...doc.data(),id:doc.id}))
            setUsersList(dataList)
        })
    },[])
    const {setIsAuth}  = props;
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const result = await signInWithPopup(auth,provider)
        setAuthToken(result.user.accessToken)
        await onSnapshot(dataref,(snap)=>{
            const data = snap.docs.map((e)=>({...e.data(),id:e.id}))
            setUsersList(data)
        })
        !(usersList.some(username=>username.id === auth.currentUser.email ))?setUser(true):setIsAuth(true)
    }

    const handleNickname = async(e)=>{
        if(inputref.current.value===""||inputref.current.value===undefined||inputref.current.value===null){
            setP("Please Enter A valid Nickname.")
        }
        else{
            cookies.set("auth-token", authToken)
            await setDoc(doc(dataref,auth.currentUser.email),{userName:inputref.current.value})
            console.log(usersList)
            setIsAuth(true)
        }

    }
    return (
        <>
        <div className={`${user?"userInput":"nouserInput"}`}>
            <div className="new">Looks Like You're New Here</div>
            <div className="error">{p}</div>
            {/* <label htmlFor="">Enter a nickname : </label> */}
            <input className="input" type="text" ref={inputref} placeholder="Enter Nickname...."/>
            <button onClick={handleNickname} className="signInButton">Submit</button>
        </div>
        <div className={`${user?"nosignIn":"signIn"}`}>
            <div className="signinwrap">
            <p>Sign In with</p>
            <img className="image" src={require("./google.png")} alt=""/></div> 
         <button className="signInButton" onClick={handleSubmit}>sign in</button>
        </div>
        </>
     );
}
 
export default Auth;