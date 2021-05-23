"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Purpose of this function is to get the token from react or postman
//Or any front end that we are using,it will send along a token that will be in header
function authentication(req, res, next) {
    var token = req.header('x-auth-token');
    try {
        //Check for token
        if (!token) {
            //401 status mean user is unauthorized
            res.status(401).json({ msg: "NO token authorization access denied" });
        }
        //Verify token
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        //We now have to take the user from the token(id in the token which is the payload)
        //Add user from the payload
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ msg: "Token is not valid" });
    }
}
module.exports = authentication;
