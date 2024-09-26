import React from 'react'

const Register = () => {
    return (
        <>
            <div className="mycontainer">
                <h1 className="font-semibold text-center mt-20 text-3xl">Register</h1>
                <div className='flex flex-col gap-y-4 justify-center items-center my-10'>
                <input type="text" placeholder="Enter your name" class="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Enter your email" class="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Enter your passowrd" class="input input-bordered w-full max-w-xs" />
                <button class="btn btn-outline">Sign up</button>
                </div>
            </div>
        </>
    )
}

export default Register