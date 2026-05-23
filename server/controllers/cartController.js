import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, sessionId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingCart = await Cart.findOne({
      product: productId,
      sessionId,
    });

    if (existingCart) {
      existingCart.quantity += quantity;

      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingCart,
      });
    }

    const cart = await Cart.create({
      product: productId,
      quantity,
      sessionId,
    });

    res.status(201).json({
      success: true,
      message: "Added to cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET CART ITEMS
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      sessionId: req.params.sessionId,
    }).populate("product");

    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CART QUANTITY
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity,
      },
      {
        returnDocument: "after",
      },
    );

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
