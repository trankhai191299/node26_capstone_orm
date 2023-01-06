const { AppError } = require("../helpers/error");
const { User } = require("../models");

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

module.exports = {
    adminCreateUserService,
    registerService
}