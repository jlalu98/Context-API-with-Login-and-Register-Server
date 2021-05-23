"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
}, { timestamps: true }); //passing a constructor here
//craeting a mode based on tht  object
var Book = mongoose.model('books', bookSchema);
//books is Collection
module.exports = Book;
