import React, { useRef, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const loginRef=useRef();
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
      toast("login succesfull")
    //   navigate to home
      Navigate('/')
      } catch (error) {
        console.log("error:",error.response)
        if(error.response.data.message){
        toast(error.response.data.message);
        }else{
          console.log(error.response.data.errors[0].msg)
         toast(error.response.data.errors[0].msg)
        }

      }
    }

    const Showpassword=(e)=>{
      if(loginRef.current.type==="password"){
          e.target.src='/eye.svg'
          loginRef.current.type="text"
      }else{
          e.target.src='/eye-slash.svg'
          loginRef.current.type="password"
      }
    }
    
    
  return (
    <div className='flex flex-col items-center justify-center sm:my-5'>
      <h1 className=' text-2xl pb-4 sm:p-0 md:text-5xl font-medium'>INoto</h1>
      <form className='w-[55vw] lg:w-[23vw] flex flex-col gap-3' action="">
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold sm:text-lg' htmlFor="email">Your email</label>
            <input className='px-2 py-2 outline-blur border border-gray-300 rounded-xl outline-blue-600' type="email" value={form.email} name='email' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5 relative '>
            <img className='absolute top-[60%] right-[2%]' onClick={Showpassword} src="/eye-slash.svg" width={20} alt="" />
            <label className='font-semibold sm:text-lg' htmlFor="password">Your password</label>
            <input className='px-2 py-2 outline-blue-600 border border-gray-300 rounded-xl' name='password' type="password" ref={loginRef} value={form.password} onChange={handlechange} required/>
        </div>
        <button type='button' className='bg-blue-700 font-semibold text-white text-lg rounded-xl px-4 py-1 my-1 hover:cursor-pointer' onClick={handlesubmit} >Login</button>
      </form>
    </div>
  )
}

export default Login
