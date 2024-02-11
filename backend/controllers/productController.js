import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, brand, price, quantity, category } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !category:
        return res.json({ error: "Category is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, brand, price, quantity, category } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !category:
        return res.json({ error: "Category is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json("Internal Server Error");
  }
});
export { fetchProducts, addProduct, updateProductDetails, deleteProduct };
