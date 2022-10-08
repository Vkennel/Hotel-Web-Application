"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.updateLoginSchema = exports.createRegisterSchema = exports.updateListenerSchema = exports.createListenerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createListenerSchema = joi_1.default.object().keys({
    image: joi_1.default.string().required(),
    address: joi_1.default.string().lowercase().required(),
    price: joi_1.default.required(),
    numOfBeds: joi_1.default.number().required(),
    numOfBaths: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
});
exports.updateListenerSchema = joi_1.default.object().keys({
    image: joi_1.default.required(),
    address: joi_1.default.string().lowercase().required(),
    price: joi_1.default.number().required(),
    numOfBeds: joi_1.default.number().required(),
    numOfBaths: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
});
exports.createRegisterSchema = joi_1.default.object()
    .keys({
    fullName: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.updateLoginSchema = joi_1.default.object()
    .keys({
    fullName: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phonenumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().required(),
});
//Generate Token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
//This is to ensure the error message is properly written
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
