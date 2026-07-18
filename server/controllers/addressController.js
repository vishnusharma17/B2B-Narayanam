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
// GET SINGLE ADDRESS
export const getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
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

// UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.fullName = req.body.fullName;
    address.phone = req.body.phone;
    address.pincode = req.body.pincode;
    address.house = req.body.house;
    address.landmark = req.body.landmark;
    address.city = req.body.city;
    address.state = req.body.state;
    address.type = req.body.type;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
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
