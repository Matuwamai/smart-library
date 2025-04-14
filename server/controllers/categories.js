import db from "../db/index.js";
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const category = await db.bookCategory.create({
      data: { name, description },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Error creating category" });
  }
};
export const listCategories = async (req, res) => {
  try {
    const categories = await db.bookCategory.findMany({
      include: {
        Book: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
export const getCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await db.bookCategory.findUnique({
      where: { id: Number(categoryId) },
      include: {
        Book: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Error fetching category" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const category = await db.bookCategory.update({
      where: { id: Number(categoryId) },
      data: { name, description },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Error updating category" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    await db.bookCategory.delete({
      where: { id: Number(categoryId) },
    });

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category" });
  }
};
