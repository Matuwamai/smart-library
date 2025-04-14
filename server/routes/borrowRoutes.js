import express from "express";
import {
  createBorrowing,
  getUserBorrowings,
  getBorrowById,
  getAllBorrowings,
  updateBorrowing,
  deleteBorrowing
} from "../controllers/borrowings.js";

const router = express.Router();

router.post("/", createBorrowing);
router.get("/", getAllBorrowings);
router.get("/user/:userId", getUserBorrowings);
router.get("/:borrowId", getBorrowById);
router.put("/:borrowId", updateBorrowing);
router.delete("/:borrowId", deleteBorrowing);

export default router;
