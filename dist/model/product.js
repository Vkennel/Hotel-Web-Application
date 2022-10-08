"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class ProductInstance extends sequelize_1.Model {
}
exports.ProductInstance = ProductInstance;
ProductInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    countInStock: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    numReviews: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'product',
});
