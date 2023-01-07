const { AppError } = require("../helpers/error");
const { User, Image } = require("../models");

const adminCreateUserService = async(data) => {
    try {
        const userFound = await User.findOne({
            where:{
                email:data.email
            }
        });
        if(userFound){
            throw new AppError(400,"Email is existed");
        };

        const createdUser = await User.create(data);
        return createdUser;
    } catch (error) {
        throw error;
    };
};
const registerService = async(data)=>{
    try {
        const userFound = await User.findOne({
            where:{
                email:data.email,
            }
        })
        if(userFound){
            throw new AppError(401,"email is existed")
        }
        const createdUser = await User.create(data)
        return createdUser;
    } catch (error) {
        throw error
    }
}
const getCommentbyImgIdService = async(imgId)=>{
    try {
        const imgFound = await Image.findOne({
            where:{
                id:imgId
            }
        })
        if(!imgFound){
            throw new AppError(404,"image not found");
        }
        // console.log('Img proto',imgFound.__proto__);
        
        const userCmt = await imgFound.getNguoi_binh_luan({
            attributes:{
                exclude:['password','role'],
            },
        });
        
        return {
            userCmt,
            imgFound
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    adminCreateUserService,
    registerService,
    getCommentbyImgIdService
}