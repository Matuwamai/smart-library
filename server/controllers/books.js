import db from "../db/index.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage }).single("image");

export const createBook = async (req, res) => {
  try {
    const { name, title, auther, categoryId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Book image is required!" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const book = await db.book.create({
      data: {
        name,
        title,
        auther,
        categoryId: Number(categoryId),
        image: imageUrl,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book" });
  }
};

export const listBooks = async (req, res) => {
  try {
    const books = await db.book.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const getBookDetails = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await db.book.findUnique({
      where: { id: Number(bookId) },
      include: { category: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Error fetching book" });
  }
};
export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { name, title, auther, image, categoryId } = req.body;

    if (!name || !title || !auther || !image || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBook = await db.book.findUnique({
      where: { id: Number(bookId) },
    });

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await db.book.update({
      where: { id: Number(bookId) },
      data: {
        name,
        title,
        auther,
        image,
        categoryId: Number(categoryId),
      },
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const id = Number(bookId);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await db.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await db.book.delete({
      where: { id },
    });

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
};
