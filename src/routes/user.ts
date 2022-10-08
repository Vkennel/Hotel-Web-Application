
import express from "express";
const router = express.Router();
import { RegisterUser, LoginUser, getUser } from "../controller/userController";

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("./read", getUser)

export default router;



