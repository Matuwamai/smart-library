import db from "../db/index.js";
export const createBorrowing = async (req, res) => {
  try {
    const { userId, bookIds } = req.body;

    if (!userId || !bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
      return res.status(400).json({ message: "User ID and book IDs are required" });
    }

    const borrow = await db.borrow.create({
      data: {
        userId: Number(userId),
        borrowItems: {
          create: bookIds.map((bookId) => ({
            bookId: Number(bookId),
          })),
        },
      },
      include: {
        borrowItems: {
          include: {
            book: true,
          },
        },
      },
    });

    res.status(201).json(borrow);
  } catch (error) {
    console.error("Error creating borrowing:", error);
    res.status(500).json({ message: "Failed to create borrowing" });
  }
};

export const getUserBorrowings = async (req, res) => {
  try {
    const { userId } = req.params;

    const borrowings = await db.borrow.findMany({
      where: { userId: Number(userId) },
      include: {
        borrowItems: {
          include: {
            book: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(borrowings);
  } catch (error) {
    console.error("Error fetching user borrowings:", error);
    res.status(500).json({ message: "Failed to fetch user borrowings" });
  }
};
export const getBorrowById = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await db.borrow.findUnique({
      where: { id: Number(borrowId) },
      include: {
        user: true,
        borrowItems: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    res.status(200).json(borrow);
  } catch (error) {
    console.error("Error fetching borrow:", error);
    res.status(500).json({ message: "Failed to fetch borrow" });
  }
};
export const getAllBorrowings = async (req, res) => {
    try {
      const borrows = await db.borrow.findMany({
        include: {
          user: true,
          borrowItems: {
            include: { book: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(borrows);
    } catch (error) {
      console.error("Error fetching all borrowings:", error);
      res.status(500).json({ message: "Failed to fetch borrowings" });
    }
  };
  export const updateBorrowing = async (req, res) => {
    try {
      const { borrowId } = req.params;
      const { status } = req.body;
  
      const existing = await db.borrow.findUnique({ where: { id: Number(borrowId) } });
      if (!existing) {
        return res.status(404).json({ message: "Borrowing not found" });
      }
  
      const updated = await db.borrow.update({
        where: { id: Number(borrowId) },
        data: {
          status,
        },
      });
  
      res.status(200).json(updated);
    } catch (error) {
      console.error("Error updating borrowing:", error);
      res.status(500).json({ message: "Failed to update borrowing" });
    }
  };
  
  export const deleteBorrowing = async (req, res) => {
    try {
      const { borrowId } = req.params;
  
      const existing = await db.borrow.findUnique({ where: { id: Number(borrowId) } });
      if (!existing) {
        return res.status(404).json({ message: "Borrowing not found" });
      }
  
      await db.borrowItem.deleteMany({ where: { borrowId: Number(borrowId) } }); 
      await db.borrow.delete({ where: { id: Number(borrowId) } });
  
      res.status(204).json(); 
    } catch (error) {
      console.error("Error deleting borrowing:", error);
      res.status(500).json({ message: "Failed to delete borrowing" });
    }
  };