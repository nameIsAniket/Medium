import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/Signin'
import { Blog } from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<SignUp/>} />
        <Route path = '/signin' element = {<SignIn/>} />
        <Route path = '/blog' element = {<Blog/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
