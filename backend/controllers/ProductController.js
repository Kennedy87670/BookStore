const Product = require("../models/ProductModel");
const { uploadSingleImageToCloudinary } = require("../utils/helpers");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      overview,
      long_description,
      price,
      rating,
      in_stock,
      size,
      best_seller,
      poster, // This allows for direct URL input for the poster
    } = req.body;

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      // if (req.file) {
      //   fs.unlinkSync(req.file.path); // Delete the file from local storage
      // }
      return res
        .status(400)
        .json({ error: "A product with this name already exists." });
    }

    let finalPoster = poster; // Use poster URL from request body if provided

    // Handle file upload if an image is provided via form-data
    if (req.file) {
      finalPoster = await uploadSingleImageToCloudinary(req.file.path); // Upload to Cloudinary and get the URL
    } else if (!poster) {
      return res.status(400).json({
        error: "No product image provided in either poster or image_local.",
      });
    }

    const newProduct = new Product({
      name,
      overview,
      long_description,
      price,
      poster: finalPoster, // Use Cloudinary URL or direct URL
      image_local: req.file ? req.file.path : null, // Only save local path if a file was uploaded
      rating,
      in_stock,
      size,
      best_seller,
    });

    await newProduct.save();
    res.status(201).json({
      status: "created",
      message: "Product created Successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    // Build search criteria based on query parameters
    const searchCriteria = {};

    if (name) {
      searchCriteria.name = { $regex: name, $options: "i" };
    }

    // Fetch products based on search criteria and pagination
    const products = await Product.paginate(searchCriteria, { page, limit });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const updates = req.body;
    if (req.file) {
      const newPoster = await uploadSingleImageToCloudinary(req.file.path);
      updates.poster = newPoster;
      updates.image_local = req.file.path;
    }

    Object.assign(product, updates);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.image_local) {
      // Check if the file exists before attempting to delete it
      if (fs.existsSync(product.image_local)) {
        try {
          fs.unlinkSync(product.image_local); // Remove local file
        } catch (error) {
          console.error("Error deleting local file:", error);
          return res.status(500).json({ error: "Failed to delete local file" });
        }
      } else {
        console.warn(`File not found: ${product.image_local}`);
      }
    }

    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
