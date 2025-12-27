const express=require('express');
const  mongoose=require('mongoose')
const userSchema=require('../models/userModel');

const routes=express.Router();

routes.post('/user',async(req,res)=>{
    try{
        const {firstName,lastName,email,city}=req.body;
    console.log(req.body)
    const user= await userSchema.create({
        firstName,lastName,email,city
    })

    res.status(201).json({'message':'User Created Successfully',data:user})
    }
    catch(err){
        res.status(404).json({'message':'Something went Wrong'})
    }
    
    
})

routes.get('/user',async(req,res)=>{

    try{
        const allUsers=  await userSchema.find();
         res.status(200).json({data:allUsers})

    }
    catch(err){
          res.status(404).json({'message':'Something went Wrong'})
    }
    
})

routes.delete('/deleteTask/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        console.log('taskId',id)
        const deletedTask=await userSchema.findByIdAndDelete(id);
        res.status(200).json({message:'Task is Successfully Deleted',data:deletedTask})
    }
    catch(err){
        res.status(404).json({'message':'Something went Wrong'})
    }
})

module.exports=routes;