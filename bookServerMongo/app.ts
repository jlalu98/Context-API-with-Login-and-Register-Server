import bodyParser from "body-parser"
//const express=require("express")
import express from "express"
import cors from "cors"
const morgan=require("morgan")
var app=express()
const env=require('dotenv')
env.config()
const mongoose=require("mongoose")
const books=require('./routes')
/* const users=require("./loginHandler") */
const Book=require('./schema')

const dburi=`mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@${process.env.mongodb_server}/bookManagementSystem?retryWrites=true&w=majority`
mongoose.connect(dburi,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result:any)=>app.listen(port,()=> console.log(`server running on port ${port}`)))
    .catch((err:any)=>console.log(err))
const port=process.env.port || 8060
app.use(cors())
app.use('/books',books)
/* app.use('/users',users) */
app.use(morgan('dev'))

app.use(bodyParser.json())




        
           
