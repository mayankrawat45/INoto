import express from "express";
import {Router} from "express";
import User from "../models/User.js";
import { body ,validationResult} from "express-validator";
import bcrypt, { genSalt } from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetchuser from "../middleware/fetchuser.js";


dotenv.config();
const router=express.Router()


router.post('/signin',[
    // validation using express validator
    body("name","name should contain min 3 letter").isLength({min:3}),
    body('email',"enter a valid email").isEmail(),
    body('password',"password must be greater than 4 letter").isLength({min:5})
],async(req,res)=>{
     
    // fetch validation errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try{
       const {name,email,password}=req.body;    
    // find if the user already exists
    const userEmail=await User.findOne({email})
    if(userEmail){
        return res.status(400).json({message:"this email already exists"})
    }

    // create a hash password
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);

    // otherwise create a user
    const user=await User.create({
        name:name,
        email:email,
        password:hashpassword
    })

    //make the token for the authentication
    const payload={id:user.id}
    const authtoken=jwt.sign(payload,process.env.JWT_SECRET) 
    res.send(authtoken)
   }catch(error){
    res.send(error.message)
   }
    
})

// userlogin
router.post('/login',[
    // validation using express validator
    body('email',"enter a valid email").isEmail(),
    body('password',"password must be greater than 4 letter").isLength({min:5})
],async(req,res)=>{
    // fetch validation errors
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
         // check for user authentication
    const {email,password}=req.body;
    const userexists=await User.findOne({email})
    if(!userexists){
        return res.status(400).json({message:"User not exists"})
    }

    // compare password with hash_password
    const comparePassword=await bcrypt.compare(password,userexists.password);
    if(!comparePassword){
        return res.status(400).json({message:"incorrect password"})
    }
    const payload={id:userexists.id}
    const authtoken=jwt.sign(payload,process.env.JWT_SECRET)
    res.json({authtoken})


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
   })

//    Get user details using jwt tokens

router.get('/getuser',fetchuser,async(req,res)=>{
    const id=req.body.data.id;
    try {
        const user=await User.findById(id).select("-password")
    res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


export default router;