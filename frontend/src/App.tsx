import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs.tsx'
import { Publish } from './pages/Publish.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<SignUp/>} />
        <Route path = '/signin' element = {<SignIn/>} />
        <Route path = '/blog/:id' element = {<Blog/>} />
        <Route path = '/blogs' element = {<Blogs/>} />
        <Route path = '/publish' element = {<Publish/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
