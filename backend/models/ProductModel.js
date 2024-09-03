const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  overview: { type: String, required: true },
  long_description: { type: String, required: true },
  price: { type: Number, required: true },
  poster: { type: String },
  image_local: { type: String },
  rating: { type: Number, default: 0 },
  in_stock: { type: Boolean, default: true },
  size: { type: Number, required: true },
  best_seller: { type: Boolean, default: false },
});

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", ProductSchema);
