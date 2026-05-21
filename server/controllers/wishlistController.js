import Product from "../models/productModel.js";
import Wishlist from "../models/Wishlist.js";

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { productId, sessionId } = req.body;

    if (!productId || !sessionId) {
      return res.status(400).json({
        success: false,
        message: "Product ID and session ID are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existing = await Wishlist.findOne({
      productId: productId,
      sessionId: sessionId,
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Already in wishlist",
      });
    }

    const item = await Wishlist.create({
      productId: productId,
      sessionId: sessionId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET WISHLIST ITEMS
export const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({
      sessionId: req.params.sessionId,
    }).populate("productId");

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE WISHLIST ITEM
export const removeWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
