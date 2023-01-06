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
module.exports = {
    getImageService,
    getImageByName,
    getUserImgbyId,
};