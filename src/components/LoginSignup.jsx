import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState } from "react"

const getErrorMessage = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Incorrect email/password.";

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
};

export function LoginSignup ({isLogin,isLoginForm,setIsLoginForm}) {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    const signinsubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            setErrorMessage('Sign In Successfully')
            setLoginEmail("")
            setLoginPassword("")
            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        } catch (error) {
            setErrorMessage(getErrorMessage(error.code))
            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        }
    }

    const signupsubmit = async (e) => {
        e.preventDefault()
        if (signUpPassword.trim().length >= 6 && signUpPassword === signUpPasswordConfirm) {
            try {
                await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
                setErrorMessage("Signup Successfully")
                setSignUpEmail("")
                setSignUpPassword("")
                setSignUpPasswordConfirm("")
                setTimeout(() => {
                    setErrorMessage("")
                    setIsLoginForm(true)
                }, 2000)
            } catch (error) {
                setErrorMessage(error.code)
            }
        }
        else {
            setErrorMessage("Password doesn't match, check and try again!")
            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        }
    }

    const signinwithGoogle = async (e)=>{
        e.preventDefault()
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error)
        }
    }

    const login = ()=>{
        return (
            <div 
                className="bg-blue-900 border border-white dark:bg-black p-5 mb-12 mx-3 my-12  lg:m-16 rounded-lg shadow-xl w-full"  
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] text-white"
                    onSubmit={signinsubmit}
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="border border-blue-900 p-2 focus:outline-none rounded text-black" 
                        value={loginEmail}
                        onChange={(e)=>{setLoginEmail(e.target.value)}}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="border border-blue-900 p-2 focus:outline-none rounded text-black" 
                        value={loginPassword}
                        onChange={(e)=>{setLoginPassword(e.target.value)}}
                        minLength={6}
                        required
                        />
                    </div>
                    <div className="text-blue-900 dark:text-red-700 font-semibold">
                        {errorMessage}
                    </div>
                    <div>
                        <button className="bg-white dark:border font-semibold w-full p-2 rounded text-blue-900 dark:text-black">Sign in</button>
                    </div>
                    <div>
                        <button className="bg-white dark:border font-semibold w-full p-2 rounded text-blue-900 dark:text-black"
                            onClick={signinwithGoogle}
                        >Sign In With Google</button>
                    </div>
                    <div>
                        <p>Don't have an account? <span className="cursor-pointer font-semibold text-white" onClick={
                            ()=>setIsLoginForm(!isLoginForm)
                        }>Sign Up</span></p>
                    </div>
                </form>
            </div>
        )
    }

    const signup = ()=>{
        return (
            <div className="bg-blue-900 border border-white dark:bg-black p-5 mb-12 mx-3 my-12  lg:m-16 rounded-lg shadow-xl w-full">
            <div 
                
            >
                <form 
                    action=""
                    className="flex flex-col gap-4 lg:w-[400px] text-white"
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
                        minLength={6}
                        required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Comfirm Password</label>
                        <input type="password" name="password" id="password" className="p-2 focus:outline-none rounded text-black" 
                        value={signUpPasswordConfirm}
                        onChange={(e)=>setSignUpPasswordConfirm(e.target.value)}
                        minLength={6}
                        required
                        />
                    </div>    
                    <div className="text-blue-900 dark:text-white font-semibold">
                        {errorMessage}
                    </div>                
                    <div>
                        <button className="bg-white dark:text-black font-semibold dark:border w-full p-2 rounded text-blue-900">Sign Up</button>
                    </div>
                    <div>
                        <button className="bg-white text-blue-900 dark:text-black font-semibold dark:border w-full p-2 rounded"
                            onClick={signinwithGoogle}
                        >Sign Up With Google</button>
                    </div>
                    <div>
                        <p>Have an account? <span className="cursor-pointer text-white font-semibold" onClick={
                            ()=>setIsLoginForm(!isLoginForm)
                        }>Sign In</span></p>
                    </div>
                </form>
            </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full">
            { isLogin ? '': isLoginForm? login() : signup() }
        </div>
    )
}