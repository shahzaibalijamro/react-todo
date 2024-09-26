import React from 'react'

const Login = () => {
    return (
        <>
            <div className="mycontainer">
                <h1 className="font-semibold text-center mt-20 text-3xl">Login</h1>
                <div className='flex flex-col gap-y-4 justify-center items-center my-10'>
                <input type="text" placeholder="Enter your email" class="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Enter your passowrd" class="input input-bordered w-full max-w-xs" />
                <button class="btn btn-outline">Sign in</button>
                </div>
            </div>
        </>
    )
}

export default Login