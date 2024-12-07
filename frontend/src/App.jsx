import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateForm from './pages/CreateForm'
import SignupForm from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInForm from './pages/SignIn'
import ViewForm from './pages/ViewForm'
import Home from './pages/Home'
import UserForms from './pages/UserForms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/forms/:formId" element={<ViewForm />} />
            <Route path="/user-forms/:userId" element={<UserForms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
