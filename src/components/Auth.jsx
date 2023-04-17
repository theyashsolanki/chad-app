import { signInWithPopup } from 'firebase/auth'
import {auth, provider} from '../config/firebase'
import { useEffect, useState } from 'react'


import Cookies from 'universal-cookie'
const cookies = new Cookies()


export const Auth = ({setIsAuth}) => {
    const [err, setErr] = useState(false)
    const signInWithgoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        }
        catch (e) {
            setErr(true)
        }
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if(user) {
                console.log('logged in')
            } else {
                console.log('logged out')
            }
        })

        return () => {
            unsub()
        }
    },[])

    return (
        <div className="auth">
            <p>Sign In With Google</p>
            <button onClick={signInWithgoogle}>Sign In</button>
            {err && <p>Something went wrong</p>}
        </div>
    )
}