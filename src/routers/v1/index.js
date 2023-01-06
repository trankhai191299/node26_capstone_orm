const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');
const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');
const v1 = express.Router();

//admin
v1.post('/admin',authorization,reqRole('admin'),userController.adminCreateUser());
//-------------------------------
// trang dang nhap dang ky
v1.post('/login',authController.login());
v1.post("/register",userController.register());
// trang chu

//trang chi tiet

//trang quan ly anh
v1.get('/profile',authorization,authController.getProfile());
//trang them anh




module.exports = v1;