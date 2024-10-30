
import { auth, googleProvider,facebookProvider } from '../config/firebase.jsx';
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth";
import {useState} from "react";


export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(auth?.currentUser?.email);
    const signIn =async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
        }
    }
        const signInWithGoogle =async () => {
            try {
                await signInWithPopup(auth, googleProvider);
            } catch (err) {
                console.error(err)
            }
        }
    const signInWithFacebook =async () => {
        try {
            // Request email scope explicitly
            facebookProvider.addScope('email');
            await signInWithPopup(auth, facebookProvider);
            console.log('User signed in with Facebook');
        } catch (err) {
            console.error(err)
        }
    }
            const Logout =async () => {
                try {
                    await signOut(auth);
                } catch (err) {
                    console.error(err)
                }
            }

    return (
        <div>
            <input type="email" placeholder="Email"
                   onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}> Sign In with Goggle</button>
            <button onClick={signInWithFacebook}> Sign In with Facebook</button>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}