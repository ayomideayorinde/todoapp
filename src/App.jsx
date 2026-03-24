import { Header } from './components/Header'
import { LoginSignup } from './components/LoginSignup'
import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', isDark)
  },[isDark])

  return (
    <div
      className='min-h-screen dark:bg-gray-300 bg-white'
    >
      <Header 
        isLogin={isLogin} 
        setIsLogin={setIsLogin}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <LoginSignup 
        isLogin={isLogin} 
        setIsLogin={setIsLogin}
      />
    </div>
  )
}

export default App
