import express from "express";
import { protect } from "../middleware/authMiddleware.js";
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

router.post("/", protect, createHotel);
router.put("/:id", protect, updateHotel);
router.delete("/:id", protect, deleteHotel);

export default router;
