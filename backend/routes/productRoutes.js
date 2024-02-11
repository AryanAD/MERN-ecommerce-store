import express from "express";
import formiddable from "express-formidable";
const router = express.Router();

// controllers
import {
  fetchProducts,
  addProduct,
  updateProductDetails,
  deleteProduct,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formiddable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formiddable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
