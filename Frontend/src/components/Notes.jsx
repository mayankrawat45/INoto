import { useEffect } from 'react'
import { useContext } from 'react'
import { Countercontext } from '../context/CounterContext'

const Notes = (props) => {
  const context=useContext(Countercontext)
  const {editnotes,deletenote}=context
    useEffect(() => {
       context.getnotes()
    }, [])
    const {notes}=context;

    const handleEdit=(item) => {
      props.setform(item)
    }
    const handleDelete=(id) => {
      deletenote(id)
    }
    
    
  return (
   <>
     {notes.length===0?(
      <div className='text-xl font-semibold'>No notes till now</div>
    ):(
      <div className='flex gap-4 flex-wrap'>
      {
        notes.map(item=>{
            return (
                <div className='border-2 border-gray-500 rounded-lg  p-5 w-fit flex gap-6' key={item._id} >
                  <div className='flex flex-col gap-2.5'>
                    <h3 className='font-semibold text-3xl'>{item.title}</h3>
                    <p className='text-lg'>{item.desc}</p>
                  </div>
                  <div className='flex gap-1.5 items-start'>
                    <img className='hover:cursor-pointer' width={33} src="/edit.svg" alt="edit image" onClick={()=>{handleEdit(item)}} />
                    <img className='hover:cursor-pointer' width={33} src="/delete.svg" alt="delte image" onClick={()=>{deletenote(item._id)}} />
                  </div>
                </div>
            )
        })
      }
    </div>
    )}
   </>
  )
}

export default Notes
