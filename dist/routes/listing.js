"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const listController_1 = require("../controller/listController");
const auth_1 = require("../utils/middleware/auth");
/* GETListeners listing. */
router.post("/create", auth_1.auth, listController_1.List);
router.get("/read", listController_1.getList);
router.get("/read:id", listController_1.getSingleList);
router.put("/update/:id", auth_1.auth, listController_1.updateList);
router.delete("/delete/:id", auth_1.auth, listController_1.deleteList);
exports.default = router;
