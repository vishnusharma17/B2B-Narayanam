import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { sendEmail } from "../utils/sendEmail.js";
// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const updatedProducts = [];

    // session optional for direct buy now
    const sessionId = req.body.sessionId || null;

    // STEP 1 → Validate stock
    for (const item of req.body.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      updatedProducts.push({
        product,
        quantity: item.quantity,
      });
    }

    // STEP 2 → Create order
    // Order create
    const order = await Order.create(req.body);

    // FRONTEND KO TURANT RESPONSE
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

    // Email background me
    sendEmail({
      to: order.email,
      subject: "Order Confirmation",
      text: "Order placed successfully",
    }).catch((err) => console.log(err));

    sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Order Received",
      text: `New order received from ${order.customerName}`,
    }).catch((err) => console.log(err));

    // STEP 3 → Clear cart only if session exists
    if (sessionId) {
      await Cart.deleteMany({
        sessionId,
      });
    }

    // STEP 4 → Reduce stock
    for (const item of updatedProducts) {
      item.product.stock = item.product.stock - item.quantity;

      await item.product.save();
    }
    console.log("ORDER CREATED:");
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingId, courierName, trackingLink } = req.body;

    const updateData = {
      status,
    };

    if (trackingId) updateData.trackingId = trackingId;

    if (courierName) updateData.courierName = courierName;

    if (trackingLink) updateData.trackingLink = trackingLink;

    if (status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: "after",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// RETURN REQUEST
export const requestReturn = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (order.status !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Order not delivered yet",
      });
    }

    const days = Math.floor(
      (new Date() - new Date(order.deliveredAt)) / (1000 * 60 * 60 * 24)
    );

    if (days > 3) {
      return res.status(400).json({
        success: false,
        message: "Return window expired",
      });
    }

    if (reason !== "Wrong Size" && reason !== "Wrong Color") {
      return res.status(400).json({
        success: false,
        message: "Only size/color returns allowed",
      });
    }

    order.returnRequest = true;
    order.returnReason = reason;
    order.returnStatus = "requested";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Return request submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
