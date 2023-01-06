const {Image,sequelize} = require('../models');
const {Op} = require('sequelize')
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

module.exports = {
    getImageService,
    getImageByName,
};