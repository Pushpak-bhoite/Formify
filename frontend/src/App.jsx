import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/CreateForm'
import SignupForm from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInForm from './pages/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
