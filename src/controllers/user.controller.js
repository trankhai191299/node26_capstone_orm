const { response } = require('../helpers/response');
const userService = require('../services/user.service');

const adminCreateUser = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body;
            const createdUser = await userService.adminCreateUserService(data);
            res.status(200).json(response(createdUser));
        } catch (error) {
            next(error);
        }
    }
};

const register = () =>{
    return async(req,res,next)=>{
        try {
            const data = req.body;
            const createdUser = await userService.registerService(data)
            res.status(200).json(response(createdUser,"create successfully!"))
        } catch (error) {
            next(error);
        }
    }
}

const getCommentbyImgId = () =>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params;
            const img = await userService.getCommentbyImgIdService(id)
            res.status(200).json(response(img))
        } catch (error) {
            next(error)
        }
    }
}
const updateUserInformation = ()=>{
    return async(req,res,next)=>{
        try {
            const data = req.body
            const {user} = res.locals
            const updatedUser = await userService.updateUserInformationService(user,data)
            res.status(200).json(response(updatedUser));
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    adminCreateUser,
    register,
    getCommentbyImgId,
    updateUserInformation
}