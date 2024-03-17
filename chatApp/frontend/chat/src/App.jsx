import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import CreateChat from './components/CreateChat'
import Home from './components/Home'
import Editchat from './components/Editchat'
import Login from './components/Login'
import Sign from './components/Sign'

function App() {
 

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/newChat' element={<CreateChat/>} />
        <Route path='/editChat' element={<Editchat/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign' element={<Sign/>} />
    </Routes>

    
    </>
  )
}

export default App
