"use strict";
var config = require("config");
var jwt = require("jsonwebtoken");
function auth(req, res, next) {
    var token = req.header("authtoken");
    //check for token
    if (!token)
        res.status(401).json({ msg: "no token,authorization denied" });
    try {
        var decoded = jwt.verify(token, config.get("jwtSecret"));
        //add user from payload
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({ msg: "token is not valid" });
    }
    //verify token
}
module.exports = auth;
