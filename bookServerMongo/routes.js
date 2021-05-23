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
exports.authenticate = void 0;
var express_1 = __importDefault(require("express"));
var Book = require('./schema');
var User = require('./UserSchema');
var jwt = require("jsonwebtoken");
var body_parser_1 = __importDefault(require("body-parser"));
var router = express_1.default.Router();
router.use(body_parser_1.default.json());
var bcrypt = require("bcryptjs");
router
    .route("")
    .get(function (req, res) {
    Book.find()
        .then(function (result) {
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
})
    .post(authenticate, function (req, res) {
    var book = new Book(req.body);
    book.save();
    res.send(book);
});
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
    .delete(authenticate, function (req, res) {
    var id = req.params.id;
    Book.deleteOne({ _id: id })
        .then(function () {
        res.status(200).json({
            message: 'Books deleted'
        });
    })
        .catch(function (error) { return console.log(error); });
})
    .put(function (req, res) {
    var book = new Book({
        _id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        rating: req.body.rating,
    });
    Book.update({ _id: req.params.id }, book)
        .then(function () {
        res.status(201).json({
            message: 'Book updated successfully'
        });
    }).catch(function (error) { return console.log(error); });
});
router
    .route("/books:id")
    .get(function (req, res) {
    var id = req.params.id;
    Book.findById(id)
        .then(function (result) {
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
});
//registration
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, u1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    /*  register_date:req.body.date, */
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newUser.save()];
            case 2:
                u1 = _a.sent();
                console.log(u1);
                res.json(u1);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.send('Error...');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.route("/login").post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, userdata, user, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (!(username && password)) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ username: username, password: password })];
            case 2:
                userdata = _a.sent();
                if (userdata) {
                    user = { username: username, password: password };
                    token = jwt.sign(user, "myJwtSecret");
                    res.json(token);
                }
                else {
                    res.status(401).json("invalid");
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.send("error" + err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function authenticate(req, res, next) {
    var header = req.headers.authorization;
    console.log("header", header);
    var token = header && header.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, "myJwtSecret", function (err, user) {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json("session expired...Please login Again!");
            }
            return res.status(403).json("Something went wrong: " + err.message);
        }
        req.user = user;
        next();
    });
}
exports.authenticate = authenticate;
/*  //get user details by auth
 router.get("/auth/user",auth,(req:any,res:any)=>{
     User.findById(req.user.id)
     .select("-password")
     .then((user:any)=>res.json(user))
 }) */
module.exports = router;
