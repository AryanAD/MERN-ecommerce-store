import express from "express";
import formiddable from "express-formidable";
const router = express.Router();

// controllers
import {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProduct,
  updateProductDetails,
  deleteProduct,
  addProductReviews,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formiddable(), addProduct);
router.route("/all-products").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, addProductReviews);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formiddable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
