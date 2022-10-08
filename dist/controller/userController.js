"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Utils_1 = require("../utils/Utils");
const list_1 = require("../model/list");
// import passwordHash from "bcryptjs"
//Create new product -POST
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = Utils_1.createRegisterSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicatEmail = await user_1.UserInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const duplicatePhone = await user_1.UserInstance.findOne({
            where: { phoneNumber: req.body.phoneNumber }
        });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await user_1.UserInstance.create({
            id: id,
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash
        });
        res.render('login');
        // res.status(201).json({
        //   msg: "You have successfully created a user",
        //   record
        // });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = Utils_1.loginSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const User = (await user_1.UserInstance.findOne({
            where: { email: req.body.email },
        }));
        const { id } = User;
        const token = (0, Utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match",
            });
        }
        if (validUser) {
            res.render('dashboard');
            // res.status(200).json({
            //   message: "Successfully logged in",
            //   token,
            //   User,
            // });
        }
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.LoginUser = LoginUser;
//fetch
async function getUser(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await user_1.UserInstance.findAndCountAll({ where: {}, limit, offset, include: [{ model: list_1.ListInstance, as: 'list' }] });
        res.status(200).json({
            messsge: "You have successfully fetch all users",
            count: record.count,
            record: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to read",
            route: "/read",
        });
    }
}
exports.getUser = getUser;
