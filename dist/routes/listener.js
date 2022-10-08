"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const listeningController_1 = require("../controller/listeningController");
/* GETListeners listing. */
router.post("/create", listeningController_1.Listener);
router.get("/read", listeningController_1.getListener);
router.get("/read:id", listeningController_1.getSingleListener);
router.put("/update/:id", listeningController_1.updateListener);
router.delete("/delete/:id", listeningController_1.deleteListener);
exports.default = router;
