const app=require("./app")
const {PORT}=process.env

app.listen(4000,()=>{
    console.log(`server running at port ${PORT}...`)
})