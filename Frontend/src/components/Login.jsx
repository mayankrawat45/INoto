import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const Navigate=useNavigate();
    const [form, setform] = useState({email:"",password:""})
    const handlechange=(e) => {
      setform({...form,[e.target.name]:e.target.value})
    }

    const handlesubmit=async() => {
      try {
        let res=await axios.post("https://inoto-backend.onrender.com/api/auth/login",form)
      let data=res.data;
      localStorage.setItem("authtoken",data.authtoken)
    //   navigate to home
      Navigate('/')
      } catch (error) {
        console.log("error:",error.response)
      }
    }
    
    
  return (
    <div className='flex flex-col items-center justify-center my-5'>
      <h1 className='text-5xl font-medium'>INoto</h1>
      <form className='w-[23vw] flex flex-col gap-3' action="">
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold text-lg' htmlFor="email">Your email</label>
            <input className='px-2 py-2 outline-none border border-gray-300 rounded-xl' type="email" value={form.email} name='email' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold text-lg' htmlFor="password">Your password</label>
            <input className='px-2 py-2 outline-none border border-gray-300 rounded-xl' name='password' type="password" value={form.password} onChange={handlechange} required/>
        </div>
        <button type='button' className='bg-blue-700 font-semibold text-white text-lg rounded-xl px-4 py-1 my-1' onClick={handlesubmit} >Login</button>
      </form>
    </div>
  )
}

export default Login
