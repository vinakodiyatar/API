const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../model/User')

const router=express.Router();

//authentication
const authmiddleware=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.send('Access denied')
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch(error){
        res.status(401).send('Invalid token')
    }
};
//profile
router.get('/',authmiddleware,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user)return
        res.status(404).send('User not found')
        res.json({username:user.username});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports=router;