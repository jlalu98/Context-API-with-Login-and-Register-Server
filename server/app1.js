"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
var cors = require('cors');
var app = express_1.default();
var mongoose = require('mongoose');
var books = require('./routes/books');
var dbURI = "mongodb+srv://user_1:Jeni98@cluster0.r2jbq.mongodb.net/test1?retryWrites=true&w=majority";
var port = 3000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function (_result) { return console.log('Connected Successfully to DataBase'); })
    .catch(function (err) { return console.log(err); });
app.use(cors());
app.use("/books", books);
app.use(express_1.default.json());
// app.post('/books/users/register',async (req,res)=>{
//     const {name,email,password}=req.body;
//     const isNewUser= await User.isThisEmailInUse(email)
//     if(!isNewUser) {
//         return res.json({
//             success:false,
//             message:"The email already in use"
//         })
//     }
//     const user= await new User(
//         {
//             name,
//             email,
//             password
//         })
//     user.save();
//     res.json(user);
// })
app.listen(port, function () {
    console.log("Server Started at port " + port);
});
