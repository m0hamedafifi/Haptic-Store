const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true, required: true },
  productName: { type: String, required: true },
  description: { type: String },
  status: { type: Boolean, default: true },
  categoryId: { type: Number },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createdOn: { type: String },
  updatedOn: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  totalRate: { type: Number, required: true },
  tags: { type: String },
  discountId: { type: Number },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
