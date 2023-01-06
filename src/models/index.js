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

module.exports = {
    sequelize,
    User,
    Image,
}

