const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) =>{
    return sequelize.define(
        "LuuAnh",{
            userId:{
                type:DataTypes.INTEGER,
                field:'nguoi_dung_id'
            },
            imageId:{
                type:DataTypes.INTEGER,
                field:'hinh_id'
            },
            saveDate:{
                type:DataTypes.DATE,
                field:'ngay_luu',
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },{
            tableName:"luu_anh",
            timestamps:false,
        }
    )
}