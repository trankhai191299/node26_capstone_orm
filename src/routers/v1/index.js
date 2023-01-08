const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');
const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');
const imageController = require('../../controllers/image.controller');
const v1 = express.Router();

//--------admin--------//
v1.post('/admin',authorization,reqRole('admin'),userController.adminCreateUser());
//-------------------------------

//--------trang dang nhap dang ky--------//
v1.post('/login',authController.login()); //dang nhap
v1.post("/register",userController.register()); //dang ky

//--------trang chu--------//
v1.get('/images',imageController.getAllImage()); //get lay danh sach anh ve
v1.get('/images/:name',imageController.getImageByName());//get tim kiem anh theo ten

//--------trang chi tiet--------//
v1.get('/img/:id',imageController.getUserImgbyId())//get thong tin anh + nguoi tao anh = id anh
v1.get('/cmt/:id',userController.getCommentbyImgId())//get thong tin binh luan = id anh
//get thong tin da luu hinh nay chua the id anh
//post luu thong tin binh luan cua ng dung vs hinh anh

//--------trang quan ly anh--------//
v1.get('/profile',authorization,authController.getProfile());//get thong tin user
v1.get('/savimg',authorization,imageController.getSaveImgbyUserId())//get ds anh da luu theo userId
v1.get('/crimg',authorization,imageController.getCreatedImgbyUserId())//get ds anh da tao theo userId
v1.delete('/image/:id',authorization,imageController.deleteImgbyId());//delete xoa anh da tao theo id anh

//--------trang them anh--------//
//post them 1 anh user

//--------chinh sua thong tin ca nhan--------//
//put thong tin ca nhan


module.exports = v1;