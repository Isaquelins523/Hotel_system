import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/hotels", hotelRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
