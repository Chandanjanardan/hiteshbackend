const express=require("express")
require("dotenv").config()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const connect=require("./config/database")
const User=require("./model/user")
const auth=require("./middleware/auth")
const app=express();
app.use(express.json())
var cookieParser=require("cookie-parser");
app.use(cookieParser())


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
    const token =jwt.sign({user_id:user._id,email,firstname},
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


app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!(email && password)){
            res.status(400).send("Field is missing")
        }
        const user=await User.findOne({email})

        // if(!user){
        //     res.status(400).send("You are not registerd")
        // }
        // await bcrypt.compare(password,user.password)
        if(user && (await bcrypt.compare(password,user.password))){
            const token =jwt.sign(
                {user_id:user._id,email},
                process.env.SECRET_KEY,
                {
                    expiresIn:"2h"
                }
            )
            user.token=token
            user.password=undefined
            res.status(200).json(user)
            console.log(user)
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.status(200).json({
                success:true,
                token:token
            })
            // const options={
            //     expires:new Date(Date.now() + 3*24*60*60*1000),
            //     httpOnly:true
            // }
            // res.status(200).cookie("token" ,token,options).json({
            //     sucess:true,
            //     token,
            //     user
            // })

        }
        res.status(400).send("email or password is incorrect")
    } catch (error) {
        console.log(error)
        
    }
});

app.get("/dashboard",auth,(req,res)=>{
    res.status(200).send("welcome to secreate info")
})


// export function
module.exports=app;