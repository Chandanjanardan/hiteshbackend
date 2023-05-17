const mongoose = require("mongoose")

const Schema= mongoose.Schema;
const userSchema= new Schema({
    firstname:{
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    token :{
        type:String
    }
})

const userMondel=new mongoose.model("user",userSchema);
module.exports=userMondel