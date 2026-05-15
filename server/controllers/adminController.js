import Category from "../models/Category.js";
import Enquiry from "../models/Enquiry.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Basic counts
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    const totalTestimonials = await Review.countDocuments();

    const totalEnquiries = await Enquiry.countDocuments();

    // Paid orders count
    const paidOrders = await Order.countDocuments({
      paymentStatus: "paid",
    });

    // Revenue calculation
    const paidOrdersData = await Order.find({
      paymentStatus: "paid",
    }).select("totalAmount");

    const totalRevenue = paidOrdersData.reduce(
      (acc, order) => acc + (order.totalAmount || 0),
      0,
    );

    // Recent orders (lightweight response)
    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select("customerName email totalAmount status paymentStatus createdAt");

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalOrders,
        pendingOrders,
        totalTestimonials,
        totalEnquiries,
        paidOrders,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    console.log("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
