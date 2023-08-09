const express = require("express");
const productController = require("../controller/product");

const router = express.Router();

router
  .get("/", productController.getAllProducts)
  .post("/", productController.createProduct)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);
exports.router = router;
