import { Header } from './components/Header'
import { LoginSignup } from './components/LoginSignup'
import { TodoList } from './components/TodoList'
import { useEffect, useState } from 'react'
import './App.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [currentUser, setCurrentUser] = useState()
  const [isDark, setIsDark] = useState(false)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', isDark)
  },[isDark])

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if (user) {
        setIsLogin(true)
        setCurrentUser(user.email)
      }
      else {
        setIsLogin(false)
      }
    })
    return ()=> unsubscribe()
  })

  return (
    <div
      className='min-h-screen dark:bg-black bg-blue-900 transition-all duration-700'
    >
      <Header 
        isLogin={isLogin} 
        setIsLogin={setIsLogin}
        isLoginForm={isLoginForm}
        setIsLoginForm={setIsLoginForm}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <div className='py-20'>
        <LoginSignup 
          isLogin={isLogin} 
          setIsLogin={setIsLogin}
          isLoginForm={isLoginForm}
          setIsLoginForm={setIsLoginForm}
          currentUser={currentUser}
        />
        {
        isLogin?
          <TodoList
            currentUser={currentUser}
            isLogin={isLogin}
          />:
          ''
        }
      </div>
    </div>
  )
}

export default App
