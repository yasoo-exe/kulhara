const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  url: String,
});

const categorySchema = new Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const storeSchema = new Schema({
  name: String,
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);
const Store = mongoose.model("Store", storeSchema);

module.exports = { Product, Category, Store };
