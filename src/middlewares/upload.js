const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        // console.log(req,file);
        //Setup thư mục file đc lưu vào
        cb(null,"./static/");
    },
    filename:(req,file,cb)=>{
        // override file name đề phòng trùng file
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null,`${prefix}-${file.originalname}`);
    }
});
const upload = multer({storage:storage});
module.exports = upload;