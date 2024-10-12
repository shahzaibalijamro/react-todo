import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../config/firebase/firebaseconfig';

const Register = () => {
    async function sendUserDataToFirebase(params) {
        const pfp = `https://ui-avatars.com/api/?name=${firstNameRef.current.value}+${lastNameRef.current.value}`;
        const docRef = await addDoc(collection(db, "users"), {
            name: firstNameRef.current.value + lastNameRef.current.value,
            email: emailRef.current.value,
            pfp,
        });
        console.log("Document written with ID: ", docRef.id);
    }
    const navigate = useNavigate()
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const signUpUser = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then(async (userCredential) => {
                sendUserDataToFirebase()
                console.log(userCredential);
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/email-already-in-use' ? navigate('/login') : alert(errorCode)
            });
    }
    return (
        <>
            <div className="mycontainer">
                <h1 className="font-semibold text-center mt-20 text-3xl">Register</h1>
                <div>
                    <form className='flex flex-col gap-y-4 justify-center items-center my-10' onSubmit={signUpUser}>
                        <input type="text" placeholder="Enter your first name" className="input input-bordered w-full max-w-xs" ref={firstNameRef} required />
                        <input type="text" placeholder="Enter your last name" className="input input-bordered w-full max-w-xs" ref={lastNameRef} required />
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" ref={emailRef} required />
                        <input type="password" placeholder="Enter your passowrd" className="input input-bordered w-full max-w-xs" ref={passwordRef} required />
                        <button className="btn btn-outline">Sign up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register