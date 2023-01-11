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
const updateUserInformationService = async(requester,user)=>{
    try {
        
        const requesterFound = await User.findOne({
            where:{
                id:requester.id
            }
        })
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        if(!requesterFound){
            throw new AppError(404,'User not found')
        }
        if(!userFound){
            throw new AppError(404,'User not found')
        }
        if(requester.id !== user.id){
            throw new AppError(403,"No permission")
        }
        await requesterFound.update(user)
        await requesterFound.save()
        return requesterFound
        
    } catch (error) {
        // console.log(error);
        throw error
    }
}
module.exports = {
    adminCreateUserService,
    registerService,
    getCommentbyImgIdService,
    updateUserInformationService
}