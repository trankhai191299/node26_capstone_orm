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
module.exports = {
    getAllImage,
    getImageByName,
    getUserImgbyId,
    deleteImgbyId,
}