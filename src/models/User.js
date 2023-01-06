const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) =>{
    return sequelize.define(
        "NguoiDung",{
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                field:'nguoi_dung_id'
            },
            email:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:'email',
                validate:{
                    isEmail:{
                        msg:'invalid email'
                    },
                    notNull:{
                        msg:'require email'
                    }
                }
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
                field:'mat_khau',
                validate:{
                    notNull:{
                        msg:'require password'
                    }
                },
                set(value){
                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value,salt);
                    this.setDataValue("password",hashedPassword);
                }
            },
            name:{
                type:DataTypes.STRING,
                field:'ho_ten',
                allowNull:false,
                validate:{
                    notNull:{
                        msg:'require name'
                    }
                },
            },
            age:{
                type:DataTypes.INTEGER,
                field:'tuoi',
                validate:{
                    isNumeric:{
                        msg:'age is number'
                    },
                    min:0,
                    max:120,
                }
            },
            avatar:{
                type:DataTypes.STRING,
                field:'anh_dai_dien'
            },
            role:{
                type:DataTypes.ENUM('user','admin'),
                defaultValue:'user'
            }
        },
        {
            tableName:"nguoi_dung",
            timestamps:false,
            defaultScope: {
                attributes: {
                    exclude: ["password"],
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.password;
                },
            },
        }
    )
}