"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authentication = require("../middleware/auth");
var Book = require('../book');
var User = require('../user');
var router = express_1.default.Router();
router.use(body_parser_1.default.json());
router
    .route("")
    .get(function (req, res) {
    Book.find()
        .then(function (result) {
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
})
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, a1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                book = new Book(req.body);
                console.log(book);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book.save()
                    // console.log("hello");
                ];
            case 2:
                a1 = _a.sent();
                // console.log("hello");
                res.json(a1);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.send('Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router
    .route('/:id')
    .get(function (req, res) {
    var id = req.params.id;
    Book.findById(id)
        .then(function (result) {
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
})
    .delete(function (req, res) {
    //authentication,
    var id = req.params.id;
    console.log("ID from delte", id);
    Book.deleteOne({ _id: id })
        .then(function () {
        res.status(200).json({
            message: 'Books deleted'
        });
    })
        .catch(function (error) { return console.log("Delete Error", error); });
})
    .put(function (req, res) {
    var book = new Book({
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        rating: req.body.rating,
    });
    Book.update({ id: req.params.id }, book)
        .then(function () {
        res.status(201).json({
            message: 'Book updated successfully'
        });
    }).catch(function (error) { return console.log(error); });
});
router
    .route("/users/register")
    .post(function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, phoneNo = _a.phoneNo, password = _a.password;
    //simple validation 404 is bad request
    if (!name || !email || !phoneNo || !password)
        res.status(400).send("Please enter all fields");
    //checking for existing user
    User.findOne({ email: email })
        .then(function (user) {
        if (user) {
            res.status(400).send("User already exists");
            //res.send({status:400,mesage:"User already exist"});
        }
        //if user does not exist create a new user
        var newUser = new User({
            name: name,
            email: email,
            phoneNo: phoneNo,
            password: password
        });
        //generate salt which is used to create hash of password 
        //Create salt and hash
        bcrypt_1.default.genSalt(10, function (err, salt) {
            bcrypt_1.default.hash(newUser.password, salt, function (err, hash) {
                if (err)
                    throw err;
                newUser.password = hash;
                newUser.save()
                    .then(function (user) {
                    //Here we will take jwt and sign the token
                    jsonwebtoken_1.default.sign({ id: user.id }, //this the payload that help in uniquely identifying the user
                    config_1.default.get('jwtSecret'), //jwtsecret
                    { expiresIn: "120s" }, //this is optional and expires in 3600 s
                    function (err, token) {
                        if (err)
                            throw err;
                        res.json({
                            token: token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    });
                });
            });
        });
    });
});
router
    .route("/users/getUsers")
    .get(function (req, res) {
    User.find()
        .then(function (users) {
        res.send(users);
    })
        .catch(function (error) { return console.log("Could not get users"); });
});
router
    .route("/users/login")
    .post(function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    //simple validation 404 is bad request
    if (!email || !password)
        return res.status(400).json("Please enter all fields");
    //checking for existing user
    User.findOne({ email: email })
        .then(function (user) {
        if (!user) {
            return res.status(400).json("User does not exist!");
        }
        //Validate password
        bcrypt_1.default.compare(password, user.password)
            .then(function (isMatch) {
            if (!isMatch)
                return res.status(400).json("Invalid Credentials!!");
            //Here we will take jwt and sign the token
            jsonwebtoken_1.default.sign({ id: user.id }, //this the payload that help in uniquely identifying the user
            config_1.default.get('jwtSecret'), //jwtsecret
            { expiresIn: "120s" }, //this is optional and expires in 3600 s
            function (err, token) {
                if (err)
                    throw err;
                res.send(token);
            });
        });
    });
});
//We have to create route to check for the current user .Get the current user data
//by using token.Reason we do this is jwt authentication is stateless.
//We need to constatntly validate the user that is logged in the front end. So we need route which takes token and return user data
router
    .route("/login/user")
    .get(authentication, function (req, res) {
    User.findById(req.user.id)
        .select('-password')
        .then(function (user) { return res.json(user); });
});
router.get('/by/author/:author', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, books, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                author = new RegExp(req.params.author, 'i');
                return [4 /*yield*/, Book.find({ author: author })
                    //    res.json(books)
                ];
            case 1:
                books = _a.sent();
                //    res.json(books)
                res.send(JSON.stringify(books));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send('Error ' + err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/by/title/:title', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, books, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                title = new RegExp(req.params.title, 'i');
                return [4 /*yield*/, Book.find({ title: title })
                    //    res.json(books)
                ];
            case 1:
                books = _a.sent();
                //    res.json(books)
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send('Error ' + err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/by/rating/:rating', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book.find({ rating: { $gte: req.params.rating } })
                    // console.log(JSON.stringify(books))
                ];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books))
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.send('Error ' + err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/priced/:min/:max', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.params.min);
                return [4 /*yield*/, Book.find({
                        $and: [
                            { price: { $gte: req.params.min } },
                            { price: { $lte: req.params.max } }
                        ]
                    })
                    // console.log(JSON.stringify(books))
                ];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books))
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.send('Error ' + err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
