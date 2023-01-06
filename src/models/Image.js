const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    return sequelize.define(
        "HinhAnh",{
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'hinh_id'
            },
            name:{
                type:DataTypes.STRING,
                field:'ten_hinh'
            },
            link:{
                type:DataTypes.STRING,
                field:'duong_dan'
            },
            description:{
                type:DataTypes.STRING,
                field:'mo_ta'
            },
            userId:{
                type:DataTypes.INTEGER,
                field:'nguoi_dung_id',
                allowNull:false
            }
        },{
            tableName:'hinh_anh',
            timestamps:false,
        }
    )
}