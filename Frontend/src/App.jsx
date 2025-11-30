import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom"
import Home from './components/Home'
import About from './components/About'
import { Contextprovider } from './context/CounterProvider'
import Login from './components/Login'  
import Signup from './components/Signup'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Contextprovider>
      <ToastContainer/> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      </Contextprovider>
    </>
  )
}

export default App
