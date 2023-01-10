const { AppError } = require('../helpers/error');
const {Image,sequelize, User} = require('../models');

const getImageService = async() =>{
    try {
        const image = await Image.findAll();
        return image;
    } catch (error) {
        throw error;
    }
};

const getImageByName = async(params)=>{
    try {
        const imageFound = await Image.findAll({
            where:{
                name:sequelize.where(
                    sequelize.fn("LOWER",sequelize.col("ten_hinh")),
                    "LIKE",
                    "%" + params + "%"
                )
            }
        })
        if(!imageFound){
            imageFound = await Image.findAll();
            return imageFound;
        }
        return imageFound;
    } catch (error) {
        throw error;
    }
};

const getUserImgbyId = async(id)=>{
    try {
        const foundData = await Image.findByPk(id,{
            include:"nguoi_dung",
        })
        if(!foundData){
            throw new AppError(404,'image or user not found');
        }
        return foundData;
    } catch (error) {
        throw error;
    }
}
const deleteImgbyId = async(requester,imgId)=>{
    try {
        const imgFound = await Image.findByPk(imgId);
        if(!imgFound){
            throw new AppError(404,'Image not found');
        }
        if(imgFound.userId !== requester.id){
            throw new AppError(403,'No permission');
        }
        await Image.destroy({
            where:{
                id:imgId
            }
        });
    } catch (error) {
        throw error;
    }
}
const getCreatedImgbyUserId = async(requester)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:requester.id
            },
            include:'hinh_anh'
        });
        if(!userFound){
            throw new AppError(404,'user not found')
        };
        return userFound;
    } catch (error) {
        throw error
    }
}
const getSaveImgbyUserId = async(requester)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:requester.id
            },
            attributes:{
                exclude:['password','role'],
            }
        });
        if(!userFound){
            throw new AppError(404,'user not found')
        };
        // console.log(userFound.__proto__);
        const listImg = await userFound.getAnh_luu()
        const data = {
            "danh_sach_anh_luu":listImg,
            "nguoi_luu":userFound
        }
        return data;
    } catch (error) {
        throw error
    }
}
const saveCmt = async(cmt,user,imgId)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        });
        const imgFound = await Image.findOne({
            where:{
                id:imgId
            }
        });
        if(!userFound){
            throw new AppError(404,'User not found')
        }
        if(!imgFound){
            throw new AppError(404,'Image not found')
        }
        // console.log("proto user",userFound.__proto__);
        // console.log("proto img",imgFound.__proto__);
        // await userFound.addAnh_binh_luan(imgId,{
        //     through:{
        //         comment:cmt
        //     }
        // })
        await imgFound.addNguoi_binh_luan(user.id,{
            through:{
                comment:cmt
            }
        })
        
        return null
    } catch (error) {
        console.log(error);
        throw error
    }
}
const checkSavedImg = async(user,imgId)=>{
    try {
        let msg = ''
        let finalImg
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        const imgFound = await Image.findOne({
            where:{
                id:imgId
            }
        });
        if(!userFound){
            throw new AppError(404,'User not found')
        }
        if(!imgFound){
            throw new AppError(404,'Image not found')
        }
        // console.log("proto img",userFound.__proto__);
        const checked = await userFound.hasAnh_luu(imgId)
        if(checked){
            msg="Image has been saved"
            finalImg = imgFound
        }else{
            msg="Image has not been saved"
            finalImg = null
        }
        return {msg,finalImg}
    } catch (error) {
        // console.log(error);
        throw error
    }
}
const uploadImg = async(file,desc,user)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        if(!userFound){
            throw new AppError(404,"User not found")
        }

        const createdImg = await Image.create({
            name:file.filename,
            link:`http://localhost:4000/${file.path}`,
            description:desc?desc:"",
            userId:user.id
        })
        return createdImg
    } catch (error) {
        throw error
    }
}
module.exports = {
    getImageService,
    getImageByName,
    getUserImgbyId,
    deleteImgbyId,
    getCreatedImgbyUserId,
    getSaveImgbyUserId,
    saveCmt,
    checkSavedImg,
    uploadImg
};