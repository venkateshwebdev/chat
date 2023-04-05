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
        console.log(result.user.accessToken)
        console.log(result.user.refreshToken)
        cookies.set("auth-token", result.user.accessToken)
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