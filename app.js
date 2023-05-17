const express=require("express")
const app=express();

app.get("/",(req,res)=>{
    res.send("<h1>Hello form hitesh backend</h1>")
})


module.exports=app;