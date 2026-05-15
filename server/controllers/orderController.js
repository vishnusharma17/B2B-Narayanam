import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    // Check stock + reduce stock
    for (const item of req.body.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }

      // Reduce stock
      product.stock = product.stock - item.quantity;

      await product.save();
    }

    // Create Order
    const order = await Order.create(req.body);

    // Customer Email
    await sendEmail({
      to: order.email,
      subject: "Order Confirmation - Narayanam",
      text: `
Hello ${order.customerName},

Your order has been placed successfully.

Order Amount: ₹${order.totalAmount}

Order Status: ${order.status}

Thank you for shopping with Narayanam.
        `,
    });

    // Admin Email Alert
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Order Received - Narayanam",
      text: `
New order received.

Customer Name: ${order.customerName}
Customer Email: ${order.email}
Amount: ₹${order.totalAmount}

Please check admin panel.
        `,
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId").sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingId, courierName, trackingLink } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        trackingId,
        courierName,
        trackingLink,
      },
      {
        new: true,
      },
    );

    // Email
    await sendEmail({
      to: order.email,
      subject: "Order Update - Narayanam",
      text: `
Hello ${order.customerName},

Your order status is now: ${order.status}

Tracking ID: ${order.trackingId}
Courier: ${order.courierName}
Tracking Link: ${order.trackingLink}

Thank you ❤️
        `,
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
