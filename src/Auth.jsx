import { signInWithPopup } from 'firebase/auth'
import {db,auth,provider} from './firebase'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react';
const cookies = new Cookies();
const Auth = (props) => {
    const {setIsAuth}  = props;
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const result = await signInWithPopup(auth,provider)
        cookies.set("auth-token",result.user.refreshToken)
        setIsAuth(true)
        console.log(result)
    }
    return (
        <> 
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button type='submit'>sign in</button>
        </form>
        </>
     );
}
 
export default Auth;