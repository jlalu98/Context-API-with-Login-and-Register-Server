import express from "express";
const Book= require('./schema');
const User=require('./UserSchema')
const jwt=require("jsonwebtoken")
import bodyParser from "body-parser"
 let router=express.Router();
router.use(bodyParser.json())
const bcrypt=require("bcryptjs")

 router
    .route("")
    .get((req,res)=>{
         Book.find()
            .then((result: any)=>{
                res.send(result);
            })
            .catch((error: Error)=>console.log(error))
        })
    .post(authenticate,(req,res)=>{
        let book=new Book(req.body);
        book.save();
        res.send(book); 
    });
router
    .route('/:id')
    .get((req,res)=>{
        const id= req.params.id;
        Book.findById(id)
        .then((result: any)=>{
            res.send(result);
        })
        .catch((error: Error)=>console.log(error))
    })
    .delete(authenticate,(req,res)=>{
        const id= req.params.id;
         Book.deleteOne({_id:id})
         .then(()=>{
         res.status(200).json({
             message:'Books deleted'
         })
     })
         .catch((error:Error)=>console.log(error))
     })
     .put((req,res)=>{
        const book=new Book({
            _id:req.params.id,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            rating:req.body.rating,
        });
        Book.update({_id:req.params.id},book)
        .then(()=>{
            res.status(201).json({
                message:'Book updated successfully'
            })
        }).catch((error:Error)=>console.log(error))
    
    })
    router
    .route("/books:id")
    .get((req,res)=>{
        const id= req.params.id;
        Book.findById(id)
        .then((result: any)=>{
            res.send(result);
        })
        .catch((error: Error)=>console.log(error))
    })
    //registration
 router.post('/register', async(req:any,res:any) => {
    const newUser = new User({
        name:req.body.name,
        username: req.body.username,
        password: req.body.password,
       /*  register_date:req.body.date, */
               
    })
    // console.log(newUser);
    
    try {
       /*  console.log("newUser",newUser); */
        const u1 = await newUser.save();
        console.log(u1);
        res.json(u1)
    }catch(err){
        res.send('Error...');
    }
})

router.route("/login").post(async(req:any,res:any)=>{
    const username=req.body.username
    const password=req.body.password
    if(username&&password){
        try{
        const userdata=await User.findOne({username:username,password:password})
        if(userdata){
            const user={username:username,password:password}
            const token=jwt.sign(user,"myJwtSecret")
            res.json(token);
               
        } else{
            res.status(401).json("invalid")
        }}catch(err){
            res.send("error"+err)
        }
    }
})
export function authenticate(req:any,res:any,next:any) {
    const header = req.headers.authorization
    console.log("header",header)
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.sendStatus(401)
    }
    jwt.verify(token, "myJwtSecret", (err: any, user: any) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json("session expired...Please login Again!")
            }
            return res.status(403).json("Something went wrong: " + err.message)
        }
        req.user = user;
        next();
    })
}
   
    






   /*  //get user details by auth 
    router.get("/auth/user",auth,(req:any,res:any)=>{
        User.findById(req.user.id)
        .select("-password")
        .then((user:any)=>res.json(user))
    }) */


 module.exports=router;