import express from "express";
import {
  createBook,
  listBooks,
  getBookDetails,
  updateBook,
  deleteBook,
  upload, 
} from "../controllers/books.js";

const router = express.Router();
router.post("/", upload, createBook);
router.get("/", listBooks)
router.get("/:bookId", getBookDetails);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
