import express from "express";
import mongoose from "mongoose";
import AuthRouter from './routes/auth.js'
import NotesRouter from './routes/note.js'
import cors from "cors"

const PORT=process.env.PORT || 5000;
const app=express();

app.use(cors())

app.use(express.json())

// connecting to mongodb
await mongoose.connect("mongodb+srv://mayankdb:rmayank451@mayankbackend.t31l0ed.mongodb.net/Inoto?appName=mayankbackend")
console.log("mongodb connected")


app.use('/api/auth',AuthRouter)

app.use('/api/notes',NotesRouter)






app.listen(PORT,()=>{
    console.log("app listening on Port:",PORT)
})