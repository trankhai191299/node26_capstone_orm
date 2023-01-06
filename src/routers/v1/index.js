const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');
const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');
const imageController = require('../../controllers/image.controller');
const v1 = express.Router();

//admin
v1.post('/admin',authorization,reqRole('admin'),userController.adminCreateUser());
//-------------------------------
// trang dang nhap dang ky
v1.post('/login',authController.login()); //dang nhap
v1.post("/register",userController.register()); //dang ky
// trang chu
v1.get('/images',imageController.getAllImage()); //lay danh sach anh ve
v1.get('/images/:name',imageController.getImageByName());//tim kiem anh theo ten
//trang chi tiet
v1.get('/img/:id',imageController.getUserImgbyId())//thong tin anh + nguoi tao anh = id anh
//thong tin binh luan = id anh
//thong tin da luu hinh nay chua the id anh
//luu thong tin binh luan cua ng dung vs hinh anh
//trang quan ly anh
v1.get('/profile',authorization,authController.getProfile());
//trang them anh




module.exports = v1;