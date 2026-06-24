import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      companyName,
      city,
      inquiryType,
      product_id,
      quantity,
      budget,
      preferredContact,
    } = req.body;

    // ✅ validation start
    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10 digits",
      });
    }

    if (!inquiryType) {
      return res.status(400).json({
        success: false,
        message: "Inquiry type is required",
      });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }
    // ✅ validation end

    const enquiry = await Enquiry.find(filter)
      .populate("product_id", "name slug")
      .sort({
        createdAt: -1,
      });

    res.status(201).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// GET ALL ENQUIRIES
export const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query; // 👈 query se status le

    let filter = {};

    // ✅ agar status diya hai to filter laga
    if (status) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, priority, notes, assignedTo } = req.body;

    // ✅ status validation
    const validStatus = ["new", "contacted", "converted"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // ✅ priority validation
    const validPriority = ["low", "medium", "high"];
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      req.body, // 👈 sab fields update ho jayengi
      { returnDocument: "after" },
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
