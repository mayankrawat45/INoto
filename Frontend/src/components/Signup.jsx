import { useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const Signupref=useRef();
    const Navigate=useNavigate();
    const [form, setform] = useState({name:"",email:"",password:""})
    const handlechange=(e) => {
      setform({...form,[e.target.name]:e.target.value})
    }

    const handlesubmit=async() => {
      try {
        let res=await axios.post("https://inoto-backend.onrender.com/api/auth/signin",form)
        console.log(res.data)
        toast("signup successfull")
    //   navigate to home
      Navigate('/login')
      } catch (error) {
        if(error.response.data.message){
          toast(error.response.data.message)
        }else{
          toast(error.response.data.errors[0].msg)
        }
        console.log("error:",error.response)
      }
    }
    
    const Showpassword=(e)=>{
      if(Signupref.current.type==="password"){
          e.target.src='/eye.svg'
          Signupref.current.type="text"
      }else{
          e.target.src='/eye-slash.svg'
          Signupref.current.type="password"
      }
    }
    
  return (
    <div className='flex flex-col items-center justify-center sm:my-5'>
      <h1 className='text-2xl pb-2 sm:p-0 sm:text-5xl font-medium'>INoto</h1>
      <form className='w-[55vw] lg:w-[23vw] flex flex-col gap-3' action="">
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold sm:text-lg' htmlFor="name">Your name</label>
            <input className='px-2 py-2 outline-blue-600 border border-gray-300 rounded-xl' type="text" value={form.name} name='name' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold sm:text-lg' htmlFor="email">Your email</label>
            <input className='px-2 py-2 outline-blue-600 border border-gray-300 rounded-xl' type="email" value={form.email} name='email' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5 relative'>
            <img className='absolute top-[60%] right-[2%] hover:cursor-pointer' onClick={Showpassword} src="/eye-slash.svg" width={20} alt="" />
            <label className='font-semibold sm:text-lg' htmlFor="password">Your password</label>
            <input className='px-2 py-2 outline-blue-600 border border-gray-300 rounded-xl' name='password' type="password" value={form.password} ref={Signupref} onChange={handlechange} required/>
        </div>
        <button type='button' className='bg-blue-700 font-semibold text-white text-lg rounded-xl px-4 py-1 my-1 hover:cursor-pointer' onClick={handlesubmit} >Signup</button>
      </form>
    </div>
  )
}

export default Signup
