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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var User_routes_1 = __importDefault(require("./routers/User.routes"));
var Wallet_routes_1 = __importDefault(require("./routers/Wallet.routes"));
var TransectionHistory_routes_1 = __importDefault(require("./routers/TransectionHistory.routes"));
var Favorites_routes_1 = __importDefault(require("./routers/Favorites.routes"));
dotenv.config();
var app = express_1.default();
typeorm_1.createConnection();
//middleWares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
//routers
app.use('/api/v1/user', User_routes_1.default);
app.use('/api/v1/crypto', Wallet_routes_1.default, TransectionHistory_routes_1.default, Favorites_routes_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server " + process.env.PORT + " portundan ayakland\u0131r\u0131ld\u0131");
});
