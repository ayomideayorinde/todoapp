import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState } from "react"

export function LoginSignup ({isLogin,setIsLogin}) {

    const [loginEmail, setLoginEmail] = useState()
    const [loginPassword, setLoginPassword] = useState()
    const [signUpEmail, setSignUpEmail] = useState()
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('')
    const [isIncorrect, setIsIncorrect] = useState(false)

    const signupsubmit = async (e) => {
        e.preventDefault()
        if (signUpPassword.trim().length >= 6 && signUpPassword === signUpPasswordConfirm) {
            try {
                await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
                setIsIncorrect("Signup Successfully")
            } catch (error) {
                console.log(error) // 🔥 VERY IMPORTANT
                setIsIncorrect(error.message)
            }
        }
        else {
            setIsIncorrect("Password doesn't match, check and try again!")
            setTimeout(() => {
                setIsIncorrect("")
            }, 3000)
        }
    }

    const login = ()=>{
        return (
            <div 
                className="bg-blue-300 dark:bg-black p-5 mb-12 mx-3  lg:m-16 rounded-lg"  
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] dark:text-white"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="p-2 focus:outline-none rounded text-black" 
                        value={loginEmail}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded text-black" 
                        value={loginPassword}
                        required
                        />
                    </div>
                    <div>
                        <button className="bg-blue-900 dark:border w-full p-2 rounded text-white">Login</button>
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
            <div className="lg:m-16 mx-3 my-12">
            <div 
                className="bg-blue-300 dark:bg-gray-500 p-5 rounded-lg"
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] dark:text-white"
                    onSubmit={signupsubmit}
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="p-2 focus:outline-none rounded text-black" 
                        value={signUpEmail}
                        onChange={(e)=>setSignUpEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded text-black" 
                        value={signUpPassword}
                        onChange={(e)=>setSignUpPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Comfirm Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded text-black" 
                        value={signUpPasswordConfirm}
                        onChange={(e)=>setSignUpPasswordConfirm(e.target.value)}
                        required
                        />
                    </div>    
                    <div className="text-red-500 font-semibold">
                        {isIncorrect}
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