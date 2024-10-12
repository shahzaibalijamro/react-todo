import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const pfp = `https://ui-avatars.com/api/?name=Shahzaib+Ali`;
    console.log(pfp);
    return (
        <div className="navbar bg-base-100 mt-3 max-w-[1300px] mx-auto">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
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
                                src={pfp} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to={'register'}>Register</Link></li>
                        <li><Link to={'login'}>Login</Link></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
