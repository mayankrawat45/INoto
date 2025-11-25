import jwt from 'jsonwebtoken'

const fetchuser=(req,res,next) => {
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).json({message:"token not found"})
    }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET)
    req.body={...req.body,data}; 

    next();
    } catch (error) {
        res.status(401).json({message:"token unauthorized"})
    }
}




export default fetchuser;