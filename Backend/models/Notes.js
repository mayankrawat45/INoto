import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const NoteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"general"
    },
},{timestamps:true})

const Notes=mongoose.models.Notes || model("Notes",NoteSchema)

export default Notes;