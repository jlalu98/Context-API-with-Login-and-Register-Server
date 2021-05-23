"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
//const express=require("express")
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan = require("morgan");
var app = express_1.default();
var env = require('dotenv');
env.config();
var mongoose = require("mongoose");
var books = require('./routes');
/* const users=require("./loginHandler") */
var Book = require('./schema');
var dburi = "mongodb+srv://" + process.env.mongodb_user + ":" + process.env.mongodb_password + "@" + process.env.mongodb_server + "/bookManagementSystem?retryWrites=true&w=majority";
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) { return app.listen(port, function () { return console.log("server running on port " + port); }); })
    .catch(function (err) { return console.log(err); });
var port = process.env.port || 8060;
app.use(cors_1.default());
app.use('/books', books);
/* app.use('/users',users) */
app.use(morgan('dev'));
app.use(body_parser_1.default.json());
