import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notes from './Notes'
import { Countercontext } from '../context/CounterContext'
import { useContext } from 'react'

const Home = () => {
  const navigate=useNavigate()
  const isLoggedIn=localStorage.getItem("authtoken")
  const context=useContext(Countercontext);
  const {editnotes,addnotes}=context;
  const [form, setform] = useState({title:"",desc:"",tag:""})
  
  useEffect(() => {
    if(!isLoggedIn){
      navigate("/login")
    }
  }, [navigate])
  

  const handleChange=(e) => {
    setform({...form,[e.target.name]:e.target.value})
  }
  
  const handleSubmit=(e) => {
    if(form._id){ 
      editnotes(form._id,form)
      setform({title:"",desc:"",tag:""})
    }else{
      addnotes(form)
      setform({title:"",desc:"",tag:""})
    }
  }
  
  
  return (
    
        <div className='w-[50vw] mx-auto my-5 flex flex-col gap-3'>
      <h1 className='text-4xl font-semibold'>Add a Note</h1>
      <form className='flex flex-col w-[40vw] gap-3.5' action="" >
        <div className='flex flex-col gap-2.5 '>
          <label htmlFor="title">Title</label>
          <input className='border border-gray-400 rounded-lg p-2 outline-blue-500' type="text" name='title' id='title' value={form.title} onChange={handleChange} />
        </div>
        <div className='flex flex-col gap-2.5 '>
          <label htmlFor="title">Description</label>
          <input className='border border-gray-400 rounded-lg p-2 outline-blue-500' type="text" name='desc' id='title' value={form.desc} onChange={handleChange} />
        </div>
        <div className='flex flex-col gap-2.5 '>
          <label htmlFor="title">Tag</label>
          <input className='border border-gray-400 rounded-lg p-2 outline-blue-500' type="text" name='tag' id='title' value={form.tag} onChange={handleChange} />
        </div>
        <button className='bg-blue-500 p-2 px-4 rounded-lg font-semibold text-white w-fit' type='button' onClick={handleSubmit}>Add Note</button>
      </form>
      <h1 className='text-4xl font-semibold'>Your Notes</h1>
      <Notes form={form} setform={setform}/>
    </div>
      
  )
}

export default Home
