"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Favorites_1 = require("../../controller/CryptoTransection/Favorites");
var router = express_1.Router();
var favorites = new Favorites_1.Favorites;
router.post('/favorites', favorites.createFavorite);
exports.default = router;
