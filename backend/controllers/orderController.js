import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const createOrder = async (req, res) => {
  try {
    res.send("HELLO WORLD THIS IS CREATE ORDER");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createOrder };
