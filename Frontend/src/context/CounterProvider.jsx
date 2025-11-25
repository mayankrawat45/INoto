import { useEffect, useState } from "react"
import { Countercontext } from "./CounterContext"
import axios from "axios"

export const Contextprovider=(props) => {
    const [notes, setnotes] = useState([])
    
      const getnotes=async () => {
        const token =localStorage.getItem("authtoken")
        try {
          let res=await axios.get("http://localhost:5000/api/notes/fetchallnotes",{
          headers:{
            "auth-token":token,
            "Content-Type":"application/json"
          }
        })
        setnotes(res.data)
        } catch (error) {
          console.log(error.response)
        }
      }

      const addnotes=async(note) => {
        const token=localStorage.getItem("authtoken")
        try {
          let res=await axios.post("http://localhost:5000/api/notes/addnote",note,{
          headers:{
            "auth-token":token,
            "Content-Type":"application/json"
          }
        })
        getnotes();
        } catch (error) {
          console.log("error occured while adding notes:",error.response)
        }
      }
      
    
      const editnotes=async(id,editednote) => {
        const token=localStorage.getItem("authtoken")
        try {
          let res=await axios.put(`http://localhost:5000/api/notes/editnote/${id}`,editednote,{
            headers:{
              "auth-token":token,
              "Content-Type":"application/json"
            }
          })
          getnotes()
        } catch (error) {
          console.log(error.response)
        }
      }
      
      const deletenote=async(id)=>{
        const token=localStorage.getItem("authtoken")
        try {
          let res=await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`,{
            headers:{
              "auth-token":token,
              "Content-Type":"application/json"
            }
          })
          getnotes()
        } catch (error) {
          console.log(error.response)
        }

      }

  return (
    <Countercontext.Provider value={{notes, getnotes,editnotes,addnotes,deletenote}}>
        {props.children}
    </Countercontext.Provider>
  )
}