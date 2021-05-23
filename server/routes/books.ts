import bodyParser from "body-parser";
import express from "express";
import bcrypt from "bcrypt"
import config from "config"
import jwt from "jsonwebtoken"
import { Response } from "express"
import { IGetUserAuthInfoRequest } from "./request-def"
import { AnyARecord } from "node:dns";
const authentication = require("../middleware/auth");
const Book = require('../book');
const User = require('../user');
let router = express.Router();
router.use(bodyParser.json());
router
    .route("")
    .get((req, res) => {
        Book.find()
            .then((result: any) => {
                res.send(result);
            })
            .catch((error: Error) => console.log(error))
    })
    .post(async (req, res) => {
        //authentication,
        let book = new Book(req.body);
        console.log(book);

        //book.save();
        //res.send(book);
        try {
            // console.log("hii");
            const a1 = await book.save()
            // console.log("hello");
            res.json(a1)
        } catch (err) {
            res.send('Error')
        }
    });
router
    .route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        Book.findById(id)
            .then((result: any) => {
                res.send(result);
            })
            .catch((error: Error) => console.log(error))
    })
    .delete((req, res) => {
        //authentication,
        const id = req.params.id;
        console.log("ID from delte", id);

        Book.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    message: 'Books deleted'
                })
            })
            .catch((error: Error) => console.log("Delete Error", error))
    })
    .put((req, res) => {
        const book = new Book({
            id: req.params.id,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            rating: req.body.rating,
        });
        Book.update({ id: req.params.id }, book)
            .then(() => {
                res.status(201).json({
                    message: 'Book updated successfully'
                })
            }).catch((error: Error) => console.log(error))

    })


router
    .route("/users/register")
    .post((req, res) => {
        const { name, email, phoneNo, password } = req.body;

        //simple validation 404 is bad request
        if (!name || !email || !phoneNo || !password)
            res.status(400).send("Please enter all fields");
        //checking for existing user
        User.findOne({ email: email })
            .then((user: any) => {
                if (user) {
                    res.status(400).send("User already exists")
                    //res.send({status:400,mesage:"User already exist"});
                }
                //if user does not exist create a new user
                const newUser = new User({
                    name: name,
                    email: email,
                    phoneNo: phoneNo,
                    password: password
                });
                //generate salt which is used to create hash of password 
                //Create salt and hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then((user: any) => {

                                //Here we will take jwt and sign the token
                                jwt.sign(
                                    { id: user.id },//this the payload that help in uniquely identifying the user
                                    config.get('jwtSecret'),//jwtsecret
                                    { expiresIn: "120s" },//this is optional and expires in 3600 s
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            token: token,//this will help us authenticate with private routes once user is registered
                                            user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email
                                            }
                                        })
                                    }
                                )
                            })
                    })
                })

            })
    })
router
    .route("/users/getUsers")
    .get((req, res) => {
        User.find()
            .then((users: any) => {
                res.send(users)
            })
            .catch((error: Error) => console.log("Could not get users"))
    })
router
    .route("/users/login")
    .post((req, res) => {
        const { email, password } = req.body;

        //simple validation 404 is bad request
        if (!email || !password)
            return res.status(400).json("Please enter all fields");
        //checking for existing user
        User.findOne({ email: email })
            .then((user: any) => {
                if (!user) {
                    return res.status(400).json("User does not exist!")
                }

                //Validate password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json("Invalid Credentials!!");

                        //Here we will take jwt and sign the token
                        jwt.sign(
                            { id: user.id },//this the payload that help in uniquely identifying the user
                            config.get('jwtSecret'),//jwtsecret
                            { expiresIn: "120s" },//this is optional and expires in 3600 s
                            (err, token) => {
                                if (err) throw err;
                                res.send(token)
                            }
                        )
                    })
            });
    });
//We have to create route to check for the current user .Get the current user data
//by using token.Reason we do this is jwt authentication is stateless.
//We need to constatntly validate the user that is logged in the front end. So we need route which takes token and return user data
router
    .route("/login/user")
    .get(authentication, (req: any, res: any) => {
        User.findById(req.user.id)
            .select('-password')
            .then((user: any) => res.json(user))
    })


router.get('/by/author/:author', async (req: any, res: any) => {
    try {
        const author = new RegExp(req.params.author, 'i');
        const books = await Book.find({ author: author })
        //    res.json(books)
        res.send(JSON.stringify(books))
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/by/title/:title', async (req: any, res: any) => {
    try {
        const title = new RegExp(req.params.title, 'i')
        const books = await Book.find({ title })
        //    res.json(books)
        res.send(books)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/by/rating/:rating', async (req: any, res: any) => {
    try {
        let books = await Book.find({ rating: { $gte: req.params.rating } })
        // console.log(JSON.stringify(books))
        res.send(books)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/priced/:min/:max', async (req: any, res: any) => {
    try {
        console.log(req.params.min)
        let books = await Book.find({
            $and: [

                { price: { $gte: req.params.min } },

                { price: { $lte: req.params.max } }
            ]
        })
        // console.log(JSON.stringify(books))
        res.send(books)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router;