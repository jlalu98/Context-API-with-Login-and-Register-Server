const config=require("config")
const jwt=require("jsonwebtoken")
function auth(req:any,res:any,next:any){
    const token=req.header("authtoken")
    //check for token
    if(!token) res.status(401).json({msg:"no token,authorization denied"})
    try{
        const decoded=jwt.verify(token,config.get("jwtSecret"))
        //add user from payload
        req.user=decoded;
        next();

    }catch(e){
        res.status(400).json({msg:"token is not valid"})

    }
    //verify token
   
}
module.exports=auth