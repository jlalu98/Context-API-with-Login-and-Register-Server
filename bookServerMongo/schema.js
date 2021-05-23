"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bookSchema = new Schema({
    /* id:mongoose.Schema.Types.ObjectId, */
    title: String,
    author: String,
    price: String,
    rating: String,
    description: String,
    cover: String,
});
var Book = mongoose.model("books", bookSchema);
module.exports = Book;
