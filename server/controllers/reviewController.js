import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
