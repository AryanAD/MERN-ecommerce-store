import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    // Set the number of products to display per page
    const pageSize = 6;
    // Check if there is a keyword query parameter in the request
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    // Count the total number of products based on the applied keyword filter
    const count = await Product.countDocuments({ ...keyword });
    // Fetch products from the database based on the keyword filter and limit the result to the specified pageSize
    const products = await Product.find({ ...keyword }).limit(pageSize);
    // Respond to the client with a JSON object containing the fetched products, current page, total pages, and a flag indicating whether there are more pages
    res.json({
      products,
      page: 1, // Assuming it's the first page
      pages: Math.ceil(count / pageSize), // Calculate the total number of pages needed
      hasMore: false, // Assuming there are no more pages for simplicity
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    // Find the product in the database based on the provided product ID (req.params.id)
    const product = await Product.findById(req.params.id);
    // Check if the product exists
    if (product) {
      // Respond with the details of the found product
      res.json(product);
    } else {
      // If the product is not found, throw an error
      throw new Error("Product not found");
    }
    // Note: The following line is unreachable, as the function already responded in the 'if' block
    // res.json(product);
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    // Respond with a 404 Not Found status and an error message
    res.status(404).json({ error: "Product Not Found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    // Fetch all products from the database, populate the "category" field, limit the result to 12, and sort by createdAt in descending order
    const products = await Product.find()
      .populate("category") // Populate the "category" field, assuming it's a reference to another collection
      .limit(12) // Limit the result to 12 products
      .sort({ createdAt: -1 }); // Sort the products by createdAt in descending order
    // Respond with an array containing the details of all fetched products
    res.json(products);
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    // Destructure product details from the request's fields
    const { name, description, brand, price, quantity, category } = req.fields;
    // Validation: Check if required fields are present, otherwise return an error response
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
    // Create a new Product instance with the provided details
    const product = new Product({ ...req.fields });
    // Save the new product to the database
    await product.save();
    // Respond with the details of the added product
    res.json(product);
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    // Destructure product details from the request's fields
    const { name, description, brand, price, quantity, category } = req.fields;
    // Validation: Check if required fields are present, otherwise return an error response
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
    // Find and update the product in the database based on the provided product ID (req.params.id)
    const product = await Product.findByIdAndUpdate(
      req.params.id, // Product ID from request parameters
      { ...req.fields }, // Updated product details from request fields
      { new: true } // Return the modified document instead of the original
    );
    // Save the updated product to the database
    await product.save();
    // Respond with the details of the updated product
    res.json(product);
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    // Find and delete the product in the database based on the provided product ID (req.params.id)
    const product = await Product.findByIdAndDelete(req.params.id);
    // Respond with the details of the deleted product
    res.json(product);
  } catch (error) {
    // Handle any errors that occur during the execution of the try block
    console.error(error);
    res.status(400).json("Internal Server Error");
  }
});

const addProductReviews = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You have already reviewed this product");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment: comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review Added successfully" });
    } else {
      res.status(400);
      throw new Error("Product Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProduct,
  updateProductDetails,
  deleteProduct,
  addProductReviews,
};
