const express=require("express")
require("dotenv").config()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const connect=require("./config/database")
const User=require("./model/user")
const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>Hello form hitesh backend</h1>")
})

app.post("/register",async(req,res)=>{
   try {
    const {firstname,lastname,email,password}=req.body
    if(!(email && password && firstname && lastname)){
        res.status(400).send("all field are required")

    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        res.status(401).send("user alreay exist")
    }
    const myEncPassword =await bcrypt.hash(password,10)
    const user=await User.create({
        firstname,
        lastname,
        email,
        password:myEncPassword
    })
    // token creation
    const token =jwt.sign({user_id:user._id,email},
        process.env.SECRET_KEY,
        {
expiresIn:"2h"
        })
        user.token=token
        // update or not in DB

        // handle password situation
        user.password=undefined
        res.status(201).json(user)
    
   } catch (error) {
    console.log(error);
    
   }
})
// 



module.exports=app;