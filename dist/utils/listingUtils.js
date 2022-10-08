"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.updateListenerSchema = exports.createListenerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
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
//This is to ensure the error message is properly written
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
