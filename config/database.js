const mongoose=require("mongoose")

const {MONGODB_URL}=process.env
const connect=mongoose.connect(MONGODB_URL)
.then(
    console.log(`DB connected successfull`)
)
.catch(error =>{
    console.log(`Db connection fialed`);
    console.log(error)
    process.exit(1)
})
module.exports=connect