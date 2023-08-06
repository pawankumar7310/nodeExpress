const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, "price can't be negative"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [61, "wrong max price"],
  },
  rating: { type: Number, min: [0, "wrong min rating"] },
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
});

exports.product = mongoose.model("product", productSchema);
