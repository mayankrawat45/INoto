import { useEffect } from 'react'
import { useContext } from 'react'
import { Countercontext } from '../context/CounterContext'
import { toast } from 'react-toastify'

const Notes = (props) => {
  const context=useContext(Countercontext)
  const {deletenote}=context
    useEffect(() => {
       context.getnotes()
    }, [])
    const {notes}=context;

    const handleEdit=(item) => {
      props.setform(item)
    }
    const handleDelete=(id) => {
      deletenote(id)
      toast("note deleted")
    }
    
    
  return (
   <>
     {notes.length===0?(
      <div className='sm:text-xl sm:font-semibold'>No notes till now</div>
    ):(
      <div className='flex gap-1.5 sm:gap-4 flex-wrap'>
      {
        notes.map(item=>{
            return (
                <div className='border-2 border-gray-500 rounded-lg p-2 sm:p-5 w-fit flex gap-3.5 sm:gap-6' key={item._id} >
                  <div className='flex flex-col gap-1.5 sm:gap-2.5'>
                    <h3 className='font-semibold text-xl sm:text-3xl'>{item.title}</h3>
                    <p className='text-sm sm:text-xl'>{item.desc}</p>
                  </div>
                  <div className='flex gap-1.5 items-start pt-1 sm:p-0'>
                    <img className='hover:cursor-pointer w-5 sm:w-8'  src="/edit.svg" alt="edit image" onClick={()=>{handleEdit(item)}} />
                    <img className='hover:cursor-pointer w-5 sm:w-8'  src="/delete.svg" alt="delte image" onClick={()=>{handleDelete(item._id)}} />
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
