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

module.exports = {
    adminCreateUser
}