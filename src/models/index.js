const { Sequelize } = require("sequelize");
const configs = require('../config');
const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected");
    } catch (error) {
        console.log("Sequelize Error", error);
    }
})();

const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);
const Comment = require("./Comment")(sequelize);
const SaveImage = require("./SaveImage")(sequelize);

Image.belongsTo(User,{as:"nguoi_dung",foreignKey:"userId"});
User.hasMany(Image,{as:"hinh_anh",foreignKey:"userId"});

Image.belongsToMany(User,{as:'nguoi_binh_luan',through:Comment,foreignKey:'imageId'});
User.belongsToMany(Image,{as:"anh_binh_luan",through:Comment,foreignKey:'userId'});

Image.belongsToMany(User,{as:'nguoi_luu',through:SaveImage,foreignKey:'imageId'});
User.belongsToMany(Image,{as:'anh_luu',through:SaveImage,foreignKey:'userId'});



module.exports = {
    sequelize,
    User,
    Image,
}

