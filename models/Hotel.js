import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    location: { type: String, require: true },
    price: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
