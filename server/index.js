import express from "express";
import bookRoutes from "./routes/books.js";
// import path from "path";
import cors from "cors";
import  userRoutes from "./routes/users.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

app.use("/api/users",  userRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
