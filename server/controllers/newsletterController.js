import Newsletter from "../models/Newsletter.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Newsletter.findOne({
      email,
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await Newsletter.create({
      email,
    });

    res.json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
