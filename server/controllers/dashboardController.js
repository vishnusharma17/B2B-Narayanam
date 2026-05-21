import Category from "../models/CategoryModel.js";
import Enquiry from "../models/Enquiry.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Testimonial from "../models/Testimonial.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalEnquiries = await Enquiry.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "pending",
    });

    const totalTestimonials = await Testimonial.countDocuments();

    res.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalEnquiries,
        totalOrders,
        pendingOrders,
        totalTestimonials,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
