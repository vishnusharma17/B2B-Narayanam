import Address from "../models/addressModel.js";

// SAVE ADDRESS
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create({
      user: req.user._id,

      fullName: req.body.fullName,

      phone: req.body.phone,

      pincode: req.body.pincode,

      house: req.body.house,

      landmark: req.body.landmark,

      city: req.body.city,

      state: req.body.state,

      type: req.body.type,
    });

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
