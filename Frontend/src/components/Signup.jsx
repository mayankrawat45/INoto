import { useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

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
      
    //   navigate to home
      Navigate('/login')
      } catch (error) {
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
    <div className='flex flex-col items-center justify-center my-5'>
      <h1 className='text-5xl font-medium'>INoto</h1>
      <form className='w-[23vw] flex flex-col gap-3' action="">
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold text-lg' htmlFor="name">Your name</label>
            <input className='px-2 py-2 outline-none border border-gray-300 rounded-xl' type="text" value={form.name} name='name' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5'>
            <label className='font-semibold text-lg' htmlFor="email">Your email</label>
            <input className='px-2 py-2 outline-none border border-gray-300 rounded-xl' type="email" value={form.email} name='email' onChange={handlechange} required/>
        </div>
        <div className='flex flex-col gap-2.5 relative'>
            <img className='absolute top-[60%] right-[2%]' onClick={Showpassword} src="/eye-slash.svg" width={20} alt="" />
            <label className='font-semibold text-lg' htmlFor="password">Your password</label>
            <input className='px-2 py-2 outline-none border border-gray-300 rounded-xl' name='password' type="password" value={form.password} ref={Signupref} onChange={handlechange} required/>
        </div>
        <button type='button' className='bg-blue-700 font-semibold text-white text-lg rounded-xl px-4 py-1 my-1' onClick={handlesubmit} >Signup</button>
      </form>
    </div>
  )
}

export default Signup
