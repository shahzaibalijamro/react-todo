import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase/firebaseconfig';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const logInUser = event => {
        event.preventDefault();
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
            });
    }
    return (
        <>
            <div className="mycontainer">
                <h1 className="font-semibold text-center mt-20 text-3xl">Login</h1>
                <form onSubmit={logInUser} className='flex flex-col gap-y-4 justify-center items-center my-10'>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" ref={emailRef} required />
                    <input type="password" placeholder="Enter your passowrd" className="input input-bordered w-full max-w-xs" ref={passwordRef} required />
                    <button className="btn btn-outline">Sign in</button>
                </form>
            </div>
        </>
    )
}

export default Login