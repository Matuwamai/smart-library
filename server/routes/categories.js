import express from "express";
import {
  createCategory,
  listCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", listCategories);
router.get("/:categoryId", getCategoryDetails);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
