import Product from "../models/productModel.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const mainImageFile = req.files?.mainImage?.[0];

    const galleryFiles = req.files?.galleryImages || [];

    const mainImage = mainImageFile
      ? `http://localhost:5004/uploads/products/${mainImageFile.filename}`
      : "";

    const galleryImages = galleryFiles.map(
      (file) => `http://localhost:5004/uploads/products/${file.filename}`,
    );

    const product = await Product.create({
      ...req.body,

      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],

      colors: req.body.colors ? JSON.parse(req.body.colors) : [],

      mainImage,
      galleryImages,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    let mainImage = req.body.mainImage;

    // FIXED → old gallery images preserve
    let galleryImages = req.body.existingGalleryImages || [];

    // single string case fix
    if (typeof galleryImages === "string") {
      galleryImages = [galleryImages];
    }

    // update main image
    if (req.files?.mainImage?.[0]) {
      mainImage = `http://localhost:5004/uploads/products/${req.files.mainImage[0].filename}`;
    }

    // add new gallery images
    if (req.files?.galleryImages?.length > 0) {
      const newGalleryImages = req.files.galleryImages.map(
        (file) => `http://localhost:5004/uploads/products/${file.filename}`,
      );

      galleryImages = [...galleryImages, ...newGalleryImages];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,

        sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],

        colors: req.body.colors ? JSON.parse(req.body.colors) : [],

        mainImage,
        galleryImages,
      },
      {
        new: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCT BY SLUG
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    }).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET RELATED PRODUCTS
export const getRelatedProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || categoryId === "undefined" || categoryId === "null") {
      const fallbackProducts = await Product.find()
        .populate("category")
        .limit(8)
        .sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        data: fallbackProducts,
      });
    }

    let products = await Product.find({
      category: categoryId,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      });

    if (products.length === 0) {
      products = await Product.find().populate("category").limit(8).sort({
        createdAt: -1,
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET TRENDING PRODUCTS
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isTrending: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET BEST SELLER PRODUCTS
export const getBestSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isBestSeller: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProductViews = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMostViewedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ views: -1 }).limit(8);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// LIVE SEARCH PRODUCTS
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const products = await Product.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    })
      .select("name slug mainImage price_min")
      .limit(8);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
