"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const { DataTypes, Model } = require('sequelize');
const database_config_1 = __importDefault(require("../config/database.config"));
const list_1 = require("./list");
;
//Creat a new instance of the class and start using it
class UserInstance extends Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "first name is required",
            },
            notEmpty: {
                msg: "please provide a last name ",
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "email is required",
            },
            isEmail: {
                msg: "please provide a valid",
            },
        },
    },
    phoneNumber: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "phone number is required",
            },
            notEmpty: {
                msg: "please provide a valid number ",
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "password is required",
            },
            notEmpty: {
                msg: "please provide a password ",
            },
        },
    },
}, {
    //This shows that we are building db and the type of table
    sequelize: database_config_1.default,
    tableName: "user",
});
//code to relate the user and the list, put these two lines of code together  in userdatail
UserInstance.hasMany(list_1.ListInstance, { foreignKey: 'userId', as: 'list' }); //the allias has to rhyme with the list instance
list_1.ListInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });
