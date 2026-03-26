import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { Moon, Sun } from 'lucide-react'

export function Header ({isLogin,isLoginForm,setIsLoginForm,isDark,setIsDark}) {

    return (
        <div
            className="bg-blue-900 dark:bg-black transition-all duration-700 flex justify-between items-center p-3 z-50 fixed w-full shadow-md"
        >
            <div>
                <a className="text-xl font-semibold text-white" href='/'>
                    Mide Todo App
                </a>
            </div>
            <div className='flex justify-center items-center space-x-5'>
                <button
                    className='text-blue-900 dark:text-black bg-white p-2 rounded'
                    onClick={()=>setIsDark(prev => !prev)}
                >
                    {isDark?<Sun />:<Moon />}
                </button>
                <button
                    className="px-10 bg-white text-blue-900 dark:text-black font-semibold py-2 rounded"
                    onClick={
                        isLogin ? async () => {
                            await signOut(auth)
                        }: ()=>{setIsLoginForm(!isLoginForm)}
                    }
                >
                    {isLogin ? 'SignOut':isLoginForm? 'Sign Up' :'Sign In'}
                </button>
            </div>
        </div>
    )
}