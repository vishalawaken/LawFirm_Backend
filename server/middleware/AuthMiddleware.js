const jwt =require("jsonwebtoken")
const User=require("../models/User")

// Protected Route
const protect=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({message:"User Not Found"})
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports={protect};