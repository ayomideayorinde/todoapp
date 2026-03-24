//import { useState } from "react"

import { useState } from "react"

export function LoginSignup ({isLogin,setIsLogin}) {

    const [loginEmail, setLoginEmail] = useState()
    const [loginPassword, setLoginPassword] = useState()
    const [signUpEmail, setSignUpEmail] = useState()
    const [signUpPassword, setSignUpPassword] = useState()
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState()

    const login = ()=>{
        return (
            <div 
                className="bg-blue-300 dark:bg-gray-500 p-5 my-12 mx-3  lg:m-16 rounded-lg"  
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] dark:text-white"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="p-2 focus:outline-none rounded" 
                        value={loginEmail}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded" 
                        value={loginPassword}
                        required
                        />
                    </div>
                    <div>
                        <button className="bg-blue-900 w-full p-2 rounded text-white">Login</button>
                    </div>
                    <div>
                        <p>Don't have an account? <span className="cursor-pointer font-semibold text-blue-900 dark:text-white" onClick={
                            ()=>setIsLogin(!isLogin)
                        }>SignUp</span></p>
                    </div>
                </form>
            </div>
        )
    }

    const signup = ()=>{
        return (
            <div 
                className="bg-blue-300 dark:bg-gray-500 p-5 my-12 mx-3  lg:m-16 rounded-lg"
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] dark:text-white"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="p-2 focus:outline-none rounded" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Comfirm Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded" />
                    </div>
                    <div>
                        <button className="bg-blue-900 w-full p-2 rounded text-white">Sign Up</button>
                    </div>
                    <div>
                        <p>Have an account? <span className="cursor-pointer text-blue-900 dark:text-white font-semibold" onClick={
                            ()=>setIsLogin(!isLogin)
                        }>Login</span></p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:items-center justify-center">
            {
                isLogin ? login() : signup()
            }
        </div>
    )
}