import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  return (
   <>
   <BrowserRouter>
   {/* Navbar components for all pages */}
   <Navbar/> 
   <Routes>
   {/* Home page for user form */}
    <Route path='/' element={<Home/>}/>
    {/* Profiel page for showing user form data and also for edit user info */}
    <Route path='/profiles' element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App