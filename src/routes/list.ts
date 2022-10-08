import express, { Request, Response, NextFunction } from "express";

const router = express.Router();
import {
  List,
  getList,
  getSingleList,
  updateList,
  deleteList,
} from "../controller/listController";
import { auth } from "../utils/middleware/auth";

/* GETListeners listing. */
router.post("/create",auth, List);
router.get("/read", getList);
router.get("/read:id", getSingleList);
router.put("/update/:id",auth, updateList);
router.delete("/delete/:id",auth, deleteList);

export default router;



