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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jwt = __importStar(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var user = new User_1.User;
var Users = /** @class */ (function () {
    function Users() {
    }
    //   //tüm kullanıcılar listelenir
    Users.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                }
            });
        });
    };
    ;
    //id si verilen kullanıcı listelenir
    Users.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ;
    //  //kullanıcı oluşturulur
    Users.prototype.createUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results, newUser, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                        _a = newUser;
                        return [4 /*yield*/, bcrypt.hash(newUser.password, 5)];
                    case 1:
                        _a.password = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
                    case 2:
                        results = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1 + "hata");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res.json(results)];
                }
            });
        });
    };
    //   //kullanıcı güncellenir
    Users.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        typeorm_1.getRepository(User_1.User).merge(user, req.body);
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.json(results)];
                    case 3: return [2 /*return*/, res.status(404).json({ msg: 'Böyle bir kullanıcı bulunamadı' })];
                }
            });
        });
    };
    // //kullanıcı silinir
    Users.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).delete(req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    //kullanıcı login
    Users.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, err, errStatment, email, password, find, id, cmp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        password = req.body.password;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ "email": email })];
                    case 1:
                        find = _a.sent();
                        id = find.id;
                        if (!find) return [3 /*break*/, 6];
                        return [4 /*yield*/, bcrypt.compare(password, find.password)];
                    case 2:
                        cmp = _a.sent();
                        if (!cmp) return [3 /*break*/, 4];
                        return [4 /*yield*/, jwt.sign({ id: find.id, email: find.email, firstName: find.firstName, lastName: find.lastName }, '1234567!+^&%+/(^&+/safjshfbaösmç.mşlkşlkd', { expiresIn: '7d' })];
                    case 3:
                        token = _a.sent();
                        err = false;
                        return [3 /*break*/, 5];
                    case 4:
                        errStatment = "errPassword";
                        console.log(errStatment);
                        err = true;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err = true;
                        errStatment = "errEmail";
                        console.log(errStatment);
                        _a.label = 7;
                    case 7: return [2 /*return*/, res.json({ token: token, err: err, errStatment: errStatment, id: id })];
                }
            });
        });
    };
    return Users;
}());
exports.Users = Users;
// try{
//     //jwt işlemleri
//     const jwtInfo={
//         id:user.id,
//         mail:user.eposta
//     }
//     //const jwtToken=jwt.sign(jwtInfo,'35^+AHVT!^+1234^ALMS',{expiresIn:'1d'});
//     //-----------------
//     //MAİL gönderme işlemleri
//         let tranporter=nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:'isgsoftware9@gmail.com',
//                 pass:"Ismail123!'."
//             }
//         });
//         tranporter.sendMail({
//         //bu mail kimden gitti  
//         from:'Treading Game<isgsoftware9@gmail.com>',
//         //kime gidecek
//         to:user.eposta,
//         //email konusu
//         subject:'Emailni onayla',
//         //email yazısı
//         text:"Treading Game oyunu için Emailni onayla"
//         },(err,info)=>{
//             if(err){
//                 console.log("bir hata var"+err);
//             }
//             tranporter.close();
//         });
//          //----------------------
// }catch(err){
//     console.log("hata"+err);
// }
