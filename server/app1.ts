import express from "express";
import * as dotenv from "dotenv";
import config from "config";
dotenv.config({ path: __dirname+'/.env' });
var cors = require('cors');
const app=express();
const mongoose= require('mongoose');
const books= require('./routes/books')
const dbURI="mongodb+srv://user_1:Jeni98@cluster0.r2jbq.mongodb.net/test1?retryWrites=true&w=majority";


const port =3000;

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((_result: any)=>console.log('Connected Successfully to DataBase'))
.catch((err: any)=>console.log(err));
app.use(cors());
app.use("/books",books);
app.use(express.json());

app.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
});