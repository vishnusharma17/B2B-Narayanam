import Razorpay from "razorpay";

export const createPaymentOrder = async (req, res) => {
  try {
    console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "RAZORPAY SECRET:",
      process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing",
    );

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log("Payment Error Full:", error);

    res.status(500).json({
      message: error?.error?.description || error.message || "Payment failed",
    });
  }
};
