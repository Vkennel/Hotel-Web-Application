"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../model/user");
// import { UserInstance } from "../../model/userdetails";
const secret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({
                Error: "Kindly sign in as a user",
            });
        }
        const token = authorization?.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, you can't access this route",
            });
        }
        const { id } = verified;
        const user = await user_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: "User not verified",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: "User not logged in",
        });
    }
}
exports.auth = auth;
