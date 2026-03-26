import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export function Header ({isLogin,setIsLogin,isDark,setIsDark}) {

    return (
        <div
            className="bg-blue-300 dark:bg-black flex justify-between items-center p-3 z-50 fixed w-full"
        >
            <div>
                <a className="text-xl font-semibold text-blue-900 dark:text-white" href='/'>
                    Todo App
                </a>
            </div>
            <div className='flex justify-center items-center space-x-5'>
                <button
                    className='bg-white dark:bg-white p-2 rounded'
                    onClick={()=>setIsDark(prev => !prev)}
                >
                    {isDark?'Light':'Dark'}
                </button>
                <button
                    className="px-10 bg-blue-900 text-white py-2 rounded"
                    onClick={
                        isLogin ? async () => {
                            await signOut(auth)
                        }: ()=>{setIsLogin(!isLogin)}
                    }
                >
                    {isLogin ? 'SignOut':'Login'}
                </button>
            </div>
        </div>
    )
}