"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../../controller/UserTransection/UserController");
var router = express_1.Router();
var user = new UserController_1.Users;
router.get('/getusers', user.getUsers);
router.post('/cereateusers', user.createUsers);
router.get('/getİdusers/:id', user.getUser);
router.put('/updateusers/:id', user.updateUser);
router.delete('/deleteusers/:id', user.deleteUser);
exports.default = router;
