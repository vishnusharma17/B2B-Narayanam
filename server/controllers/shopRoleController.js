import ShopRole from "../models/ShopRole.js";

// get roles
export const getShopRoles = async (req, res) => {
  try {
    const roles = await ShopRole.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// create role
export const createShopRole = async (req, res) => {
  try {
    const { title, link } = req.body;

    const image = req.file
      ? `http://localhost:5004/uploads/roles/${req.file.filename}`
      : "";

    const role = await ShopRole.create({
      title,
      link,
      image,
    });

    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete role
export const deleteShopRole = async (req, res) => {
  try {
    await ShopRole.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
