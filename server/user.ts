import mongoose from "mongoose"
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique:true
   },
   phoneNo:{
      type:String,
      required:true
   },
   password: {
      type: String,
      required: true
   },
   register_date:{
      type:Date,
      default:Date.now
   }
},{
   timestamps: true,
})

const User= mongoose.model('user', userSchema);
module.exports=User;