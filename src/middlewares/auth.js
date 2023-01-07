// middleware verify token

const jwt = require('jsonwebtoken');
const { AppError } = require("../helpers/error");
const {User} = require('../models');
const configs = require('../config');

const extractTokenfromHeader = (headers) =>{
    const bearerToken = headers.authorization; // Bearer asdascljcoxc210eq
    const parts = bearerToken.split(' '); // [Bearer,asdascljcoxc210eq]
    if(parts.length !== 2 || parts[0]!= "Bearer" || !parts[1].trim()){
        next(new AppError(401,"Invalid Token"));
    };

    return parts[1];
};

const authorization = async (req,res,next)=>{
    try {
        const token = extractTokenfromHeader(req.headers);
        const payload = jwt.verify(token,configs.SECRET_KEY);
        // console.log(payload);
        // dùng token payload có chứa id của user ddeere lấy thông tin
        const user = await User.findByPk(payload.id);
        if(!user){
            next(new AppError(401,"Invalid Token"));
        };

        // lưu trữ thông tin vào res, để có thể truy cập các middleware hay controller khác
        res.locals.user = user;

        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            next(new AppError(401,"Invalid Token"));
        };
        next(error) ;
    }
};

module.exports = authorization