const express = require('express');
const userController = require('../../controllers/user.controller');
const v1 = express.Router();

//admin
v1.post('/admin',userController.adminCreateUser)
//user

module.exports = v1