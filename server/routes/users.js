import express from "express";
import { login, register, listUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register),
router.post("/login", login);
router.get("/users-lists", listUsers);


export default router;