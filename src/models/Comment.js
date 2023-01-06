const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) =>{
    return sequelize.define(
        "BinhLuan",{
            userId:{
                type:DataTypes.INTEGER,
                field:'nguoi_dung_id'
            },
            imageId:{
                type:DataTypes.INTEGER,
                field:'hinh_id'
            },
            cmtDate:{
                type:DataTypes.DATE,
                field:'ngay_binh_luan',
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },{
            tableName:"binh_luan",
            timestamps:false,
        }
    )
}