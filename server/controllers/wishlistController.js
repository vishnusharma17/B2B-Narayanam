import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId, sessionId } = req.body;

    const existing = await Wishlist.findOne({
      productId,
      sessionId,
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Already in wishlist",
      });
    }

    const item = await Wishlist.create({
      productId,
      sessionId,
    });

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({
      sessionId: req.params.sessionId,
    }).populate("productId");

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
