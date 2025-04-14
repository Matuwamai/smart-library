import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { orderRouter, productRouter, userRouter } from "./routes/index.js";
import db from "./db/index.js"


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.post("/api/products/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; 
    const product = await db.product.create({
      data: { name, image: imageUrl, price: Number(price), description },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
});
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send({ message: "API is running successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});