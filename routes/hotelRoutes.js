import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getHotelById);

// Adiciona o upload para criar e atualizar hotéis
router.post("/", protect, upload.single("image"), createHotel);
router.put("/:id", protect, upload.single("image"), updateHotel);

router.delete("/:id", protect, deleteHotel);

export default router;
