/* const mongoose=require("mongoose") */
import mongoose from "mongoose"
const Schema=mongoose.Schema
 const UserSchema=new Schema({
     name:{
         type:String,
         required:true
     },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now
    }
}
 )
 const Users=mongoose.model('logins',UserSchema)
 module.exports=Users