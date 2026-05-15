import Product from "../models/Product.js";
// GET ALL PRODUCTS

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort ? req.query.sort : "-createdAt";

    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("name price_min price_max images moq slug category")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, category, price_min, price_max, moq, images, description } =
      req.body;

    // ✅ validation
    if (!name || !price_min || !price_max || !moq) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // ✅ slug generate
    const slug = name.toLowerCase().split(" ").join("-");

    const product = await Product.create({
      name,
      slug,
      category,
      price_min,
      price_max,
      moq,
      images,
      description,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = req.body;

    if (updatedData.name) {
      updatedData.slug = updatedData.name.toLowerCase().split(" ").join("-");
    }

    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      featured: true,
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      trending: true,
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getRelatedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).limit(5);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
