const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () =>{
    return (req,res,next)=>{
        const file = req.file;
        if(!file){
            next(new AppError(400,'Missing file'));
        };
        //có thể validate loại file và kích thước = file.minitype và file.size
        file.path = file.path.replace(/\\/g,'/');
        const url = `http://localhost:4000/${file.path}`;
        res.status(200).json(response(url));
    };
};

module.exports = {
    upload,
};