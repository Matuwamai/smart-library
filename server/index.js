import express from "express";
import bookRoutes from "./routes/books.js";
import categoryRoutes from "./routes/categories.js";
import cors from "cors";
import  userRoutes from "./routes/users.js"
import borrowRoutes from "./routes/borrowRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

app.use("/api/users",  userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/borrows", bookRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
