import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Notes from "../models/Notes.js"
import { body ,validationResult} from "express-validator";
const router=express.Router()

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const user=req.body.data.id;
    const notes=await Notes.find({user})
    return res.json(notes);
})
router.post('/addnote',fetchuser,[
    body('title',"tile should contain atleast 3 letters").isLength({min:3}),
    body('desc',"description should containe atleast 5 letters").isLength({min:5})
],async(req,res)=>{
        // fetch validation errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        // make a note
    const {title,desc,tag}=req.body;
    const notes=await Notes.create({title:title,desc:desc,tag:tag,user:req.body.data.id});
    return res.json(notes);
    } catch (error) {
        console.error(error,"Server error occured in notes")
    }
})

router.put('/editnote/:id',fetchuser,async(req,res)=>{
    const {title,desc,tag}=req.body;
    const {id}=req.params;

    //making the updating note
    const newnote={}
    if(title){newnote.title=title};
    if(desc){newnote.desc=desc};
    if(tag){newnote.tag=tag};

    try{
        const findnote=await Notes.findOne({_id:id})
        if(!findnote){
            return res.status(404).json({message:"note not found"})
        }
        if(findnote.user.toString()!==req.body.data.id){
            return res.status(404).json({"message":"please provide valid token"})
        }
        const note=await Notes.findOneAndUpdate({_id:id,user:req.body.data.id},{$set:newnote},{new:true})
        res.json(note)
    }catch(error){
        console.error(error,"Server error occured in notes")
        return res.status(400).json(error.message)
    }
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {id}=req.params;

    try{
        const findnote=await Notes.findOne({_id:id})
        if(!findnote){
            return res.status(404).json({message:"note not found"})
        }
        if(findnote.user.toString()!==req.body.data.id){
            return res.status(404).json({"message":"please provide valid token"})
        }
        await Notes.findOneAndDelete({_id:id,user:req.body.data.id})
        return res.status(200).json({message:"note deleted succesfully"})
    }catch(error){
        console.error(error,"Server error occured in notes")
        return res.status(400).json(error.message)
    }
})

export default router;