const express=require("express")
require("dotenv").config()
const connect=require("./config/database")
const User=require("./model/user")
const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>Hello form hitesh backend</h1>")
})

app.post("/register",async(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    if(!(email && password && firstname && lastname)){
        res.status(400).send("all field are required")

    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        res.status(401).send("user alreay exist")
    }
})


module.exports=app;