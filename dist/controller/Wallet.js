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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var typeorm_1 = require("typeorm");
var WalletEntity_1 = require("../entity/WalletEntity");
var axios = require("axios").default;
var walletEntity = new WalletEntity_1.WalletEntity;
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    Wallet.prototype.createWallet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, currency, userId, price, control, newAmount, wallet, id, indexWallet, amount, jsonObj, results, msg, obj, newWallet, results, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currency = req.body.currency;
                        userId = req.body.userId;
                        control = false;
                        newAmount = req.body.amount;
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).find()];
                    case 1:
                        wallet = _a.sent();
                        console.log(wallet);
                        return [4 /*yield*/, axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids=" + currency)
                                .then(function (response) {
                                name = response.data[0].name;
                                price = response.data[0].price;
                            })
                                .catch(function (err) { console.log(err); })];
                    case 2:
                        _a.sent();
                        wallet.forEach(function (element) {
                            if (element.currency == currency && element.userId == userId) {
                                control = true;
                                id = element.id;
                            }
                        });
                        // price=Number(price)
                        //price= price.toFixed(4);
                        newAmount = Number(newAmount);
                        newAmount = newAmount.toFixed(2);
                        console.log(control);
                        if (!(control == true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).findOne(id)];
                    case 3:
                        indexWallet = _a.sent();
                        amount = indexWallet === null || indexWallet === void 0 ? void 0 : indexWallet.amount;
                        amount = Number(amount);
                        amount = amount.toFixed(2);
                        amount = amount - (-newAmount);
                        jsonObj = JSON.parse("{\"amount\" : \"" + amount + "\"}");
                        typeorm_1.getRepository(WalletEntity_1.WalletEntity).merge(indexWallet, jsonObj);
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).save(indexWallet)];
                    case 4:
                        results = _a.sent();
                        msg = "başarılı";
                        return [2 /*return*/, res.json({ results: results, msg: msg })];
                    case 5:
                        obj = JSON.parse("{\"name\" : \"" + name + "\" ,\"currency\" : \"" + currency + "\",\"price\" : \"" + price + "\",\"userId\" :\"" + userId + "\",\"amount\" :" + newAmount + "}");
                        newWallet = typeorm_1.getRepository(WalletEntity_1.WalletEntity).create(obj);
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).save(newWallet)];
                    case 6:
                        results = _a.sent();
                        msg = "başarılı";
                        return [2 /*return*/, res.json({ results: results, msg: msg })];
                }
            });
        });
    };
    Wallet.prototype.getWallet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).find(req.query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    Wallet.prototype.deleteWallet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).delete(req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    //id si verilen cüzdanı listelenir
    Wallet.prototype.getidwalet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).findOne(req.params.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ;
    Wallet.prototype.updatew = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updateAmount, id, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).find(req.query)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&per-page=100&page=1")
                                .then(function (response) {
                                wallet.find(function (wallet) { return response.data.find(function (data) {
                                    if (wallet.currency == data.currency) {
                                        var amount = wallet.amount / wallet.price;
                                        updateAmount = amount *= data.price;
                                        id = [wallet.id];
                                        console.log({ currency: wallet.currency, price: wallet.price, amount: wallet.amount });
                                        console.log({ currency: data.currency, price: data.price });
                                        console.log(updateAmount);
                                        console.log(id);
                                    }
                                }); });
                            })
                                .catch(function (err) { console.log(err); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })];
                }
            });
        });
    };
    ;
    Wallet.prototype.updatewalet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatePrice, wallet, currency, amount, formerPrice, result, jsonObj, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).findOne(req.params.id)];
                    case 1:
                        wallet = _a.sent();
                        currency = wallet === null || wallet === void 0 ? void 0 : wallet.currency;
                        amount = wallet === null || wallet === void 0 ? void 0 : wallet.amount;
                        formerPrice = wallet === null || wallet === void 0 ? void 0 : wallet.price;
                        return [4 /*yield*/, axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids=" + currency)
                                .then(function (response) {
                                updatePrice = response.data[0].price;
                            })
                                .catch(function (err) { console.log(err); })];
                    case 2:
                        _a.sent();
                        if (!wallet) return [3 /*break*/, 6];
                        if (!(amount <= 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).delete(req.params.id)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                    case 4:
                        amount /= formerPrice;
                        amount *= updatePrice;
                        amount = Number(amount);
                        amount = amount.toFixed(2);
                        updatePrice = Number(updatePrice);
                        jsonObj = JSON.parse("{\"amount\" : \"" + amount + "\",\"price\":\"" + updatePrice + "\"}");
                        typeorm_1.getRepository(WalletEntity_1.WalletEntity).merge(wallet, jsonObj);
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).save(wallet)];
                    case 5:
                        results = _a.sent();
                        return [2 /*return*/, res.json(results)];
                    case 6: return [2 /*return*/, res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })];
                }
            });
        });
    };
    ;
    //cüzdan güncellenir
    Wallet.prototype.sellWallet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, sellAmount, updateAmount, result, jsonObj, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).findOne(req.params.id)];
                    case 1:
                        wallet = _a.sent();
                        sellAmount = wallet === null || wallet === void 0 ? void 0 : wallet.amount;
                        console.log(sellAmount);
                        if (!wallet) return [3 /*break*/, 5];
                        updateAmount = sellAmount - req.body.amount;
                        if (!(updateAmount <= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).delete(req.params.id)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                    case 3:
                        jsonObj = JSON.parse("{\"amount\" : \"" + updateAmount + "\"}");
                        typeorm_1.getRepository(WalletEntity_1.WalletEntity).merge(wallet, jsonObj);
                        return [4 /*yield*/, typeorm_1.getRepository(WalletEntity_1.WalletEntity).save(wallet)];
                    case 4:
                        results = _a.sent();
                        return [2 /*return*/, res.json(results)];
                    case 5: return [2 /*return*/, res.status(404).json({ msg: 'Böyle bir kullanıcı bulunamadı' })];
                }
            });
        });
    };
    Wallet.prototype.algoritmaWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return Wallet;
}());
exports.Wallet = Wallet;
/*

if(wallet.amount<=0){
    const result = await getRepository(WalletEntity).delete(wallet.id);
    return res.json(result);
 }else{
   let amount=wallet.amount/wallet.price
    let updatePrice= amount*=data.price
    let jsonObj:any=JSON.parse(`{"price":"${updatePrice}"}`);
    getRepository(WalletEntity).merge(wallet.id,jsonObj);
    const results = await getRepository(WalletEntity).save(wallet);
    return res.json(results);
 }
*/
/*

async createWallet(req:Request,res:Response):Promise<Response>{


    axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+req.body.currency)
   .then(function(response:any){
       console.log(response.data[0])

      })
   .catch(function(err:any){console.log(err)});

   let obj:MyObj=JSON.parse('{"name" :"bitcoin", "currency" : '+ '"' +req.body.currency+'"}');

    const newWallet = getRepository(WalletEntity).create(obj);
    const results=await getRepository(WalletEntity).save(newWallet);



return res.json(results);
}

*/
/*
axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+req.body.currency)
.then(function(response:any){
    console.log(response.data[0])

   })
.catch(function(err:any){console.log(err)});

*/
/*
 let updatePrice:any;
        const wallet = await getRepository(WalletEntity).findOne(req.params.id);
        let currency:any=wallet?.currency
        let amount:any=wallet?.amount
        let formerPrice:any=wallet?.price

        await axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+currency)
        .then(function (response: any) {
            updatePrice= response.data[0].price;
        })
        .catch(function (err: any) { console.log(err) });
        if (wallet) {
             if(amount<=0){
                const result = await getRepository(WalletEntity).delete(req.params.id);
                return res.json(result);
             }else{
                amount/=formerPrice
                amount*=updatePrice
                amount=Number(amount)
                amount= amount.toFixed(2);
                updatePrice=Number(updatePrice)
                //updatePrice=updatePrice.toFixed(4);
                let jsonObj:any=JSON.parse(`{"amount" : "${amount}","price":"${updatePrice}"}`);
                getRepository(WalletEntity).merge(wallet,jsonObj);
                const results = await getRepository(WalletEntity).save(wallet);
                return res.json(results);
             }
        }
        return res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })
*/ 
