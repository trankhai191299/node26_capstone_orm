const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const imageService = require('../services/image.service');

const getAllImage = () =>{
    return async(req,res,next)=>{
        try {
            const getImage = await imageService.getImageService();
            res.status(200).json(response(getImage));
        } catch (error) {
            next(error);
        }
    }
}
const getImageByName = () =>{
    return async(req,res,next)=>{
        try {
            const {name} = req.params
            const getImgByName = await imageService.getImageByName(name)
            res.status(200).json(response(getImgByName));
        } catch (error) {
            next(error);
        }
    }
}
const getUserImgbyId = () =>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params;
            const foundData = await imageService.getUserImgbyId(id);
            res.status(200).json(response(foundData));
        } catch (error) {
            next(error);
        }
    }
}
const deleteImgbyId = ()=>{
    return async(req,res,next)=>{
        try {
            const {id} = req.params;
            const {user} = res.locals
            await imageService.deleteImgbyId(user,id);
            res.status(200).json(response(true))
        } catch (error) {
            next(error);
        }
    }
}
const getCreatedImgbyUserId = ()=>{
    return async(req,res,next)=>{
        try {
            const {user} = res.locals
            const listImg = await imageService.getCreatedImgbyUserId(user);
            res.status(200).json(response(listImg))
        } catch (error) {
            next(error)
        }
    }
}
const getSaveImgbyUserId = () =>{
    return async(req,res,next)=>{
        try {
            const {user} = res.locals
            const listImg = await imageService.getSaveImgbyUserId(user);
            res.status(200).json(response(listImg))
        } catch (error) {
            next(error)
        }
    }
}
const saveCmt = ()=>{
    return async(req,res,next)=>{
        try {
            const {cmt,imgId} = req.body
            const {user} = res.locals
            const savedCmt = await imageService.saveCmt(cmt,user,imgId)
            res.status(200).json(response(savedCmt))
        } catch (error) {
            next(error)
        }
    }
}
const checkSavedImg = () =>{
    return async(req,res,next)=>{
        try {
            const {imgId} = req.body
            const {user} = res.locals
            const checkSave = await imageService.checkSavedImg(user,imgId)
            res.status(200).json(response(checkSave))
        } catch (error) {
            next(error)
        }
    }
}
const uploadImg = ()=>{
    return async(req,res,next)=>{
        try {
            const file = req.file;
            const {user} = res.locals;
            const {desc} = req.body;
            if(!file){
                next(new AppError(400,'Missing file'));
            };
            const uploaded = await imageService.uploadImg(file,desc,user)
            res.status(200).json(response(uploaded))
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    getAllImage,
    getImageByName,
    getUserImgbyId,
    deleteImgbyId,
    getCreatedImgbyUserId,
    getSaveImgbyUserId,
    saveCmt,
    checkSavedImg,
    uploadImg,
}