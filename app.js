const express = require("express");
const app = express();
const mongoose = require("mongoose");
const models = require("./models/store");
const config = require("./utils/config");
const logger = require("./utils/logger");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to database successfully!");
  })
  .catch((error) => logger.error("Connection to database error!", error));

app.use(express.json());

app.post("/store", async (req, res) => {
  const { name, categories } = req.body;

  const categoryIds = await Promise.all(
    categories.map(async (category) => {
      const { name, products } = category;
      const productIds = await Promise.all(
        products.map(async (product) => {
          const newProduct = new models.Product(product);
          const savedProduct = await newProduct.save();
          return savedProduct._id;
        })
      );

      const newCategory = new models.Category({ name, products: productIds });
      const savedCategory = await newCategory.save();
      return savedCategory._id;
    })
  );

  const newStore = new models.Store({ name, categories: categoryIds });
  newStore
    .save()
    .then(() => {
      res.status(201).json({ message: "Store added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

module.exports = app;
