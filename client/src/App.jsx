import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Signin from './pages/Signin'
import { Signup } from './pages/Signup'
function App() {
  return <div>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
  </div>
}

export default App
