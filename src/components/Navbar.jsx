import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase/firebaseconfig";
const Navbar = () => {
    const navigate = useNavigate()
    const [setUser, setSetUser] = useState([])
    const currentPage = useLocation();
    const defaultPfp = `https://ui-avatars.com/api/?name=`
    console.log(defaultPfp);
    useEffect(() => {
        currentPage.pathname === '/' ? onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user.email);
                const userRef = collection(db, "users");
                const q = query(userRef, where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setSetUser(doc.data())
                });
            } else {
                console.log("User is signed out.");
            }
        }) : null
    }, [])
    const signUserOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out');
                setSetUser([])
                navigate('/login')
            })
            .catch((error) => {
                // An error happened during sign-out.
                console.error('Sign out error:', error);
            });
    }
    return (
        <div className="navbar bg-base-100 mt-3 max-w-[1300px] mx-auto">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">{setUser.name ? setUser.name : <h1>User</h1>}</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={setUser.pfp ? setUser.pfp : defaultPfp} />
                        </div>
                    </div>
                    {setUser.name ? <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li onClick={signUserOut}><a>Logout</a></li>
                    </ul> : <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to={'register'}>Register</Link></li>
                        <li><Link to={'login'}>Login</Link></li>
                    </ul>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
