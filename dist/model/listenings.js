"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListeningInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
//Creat a new instance of the class and start using it
class ListeningInstance extends sequelize_1.Model {
}
exports.ListeningInstance = ListeningInstance;
ListeningInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    numOfBeds: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    numOfBaths: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    }
}, {
    //This shows that we are building db and the type of table
    sequelize: database_config_1.default,
    tableName: "listener",
});
