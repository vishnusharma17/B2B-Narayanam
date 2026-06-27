import mongoose from "mongoose";
import Product from "../models/productModel.js";

import fs from "fs";
import cloudinary from "../config/cloudinary.js";
// ==========================
// GET ALL PRODUCTS
// ==========================
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 12;

    const search = req.query.search || "";

    const category = req.query.category || "";

    const color = req.query.color || "";

    const sort = req.query.sort || "";

    const maxPrice = Number(req.query.maxPrice) || 100000;

    const discount = Number(req.query.discount) || 0;

    const skip = (page - 1) * limit;

    let filters = {};

    // SEARCH
    if (search) {
      filters.name = {
        $regex: search,
        $options: "i",
      };
    }

    // CATEGORY
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filters.category = category;
      }
    }

    // COLOR
    if (color) {
      filters.colors = {
        $in: [color],
      };
    }

    // PRICE
    filters.price_min = {
      $lte: maxPrice,
    };

    // DISCOUNT
    if (discount > 0) {
      filters.discount_percentage = {
        $gte: discount,
      };
    }

    // SORTING
    let sortOption = {
      createdAt: -1,
    };

    if (sort === "lowToHigh") {
      sortOption = {
        price_min: 1,
      };
    }

    if (sort === "highToLow") {
      sortOption = {
        price_min: -1,
      };
    }

    const totalProducts = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,

      data: products,

      pagination: {
        currentPage: page,

        totalPages: Math.ceil(totalProducts / limit),

        totalProducts,

        productsPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// CREATE PRODUCT
// ==========================

export const createProduct = async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);

    const mainImageFile = req.files?.mainImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];
    const moreColorFiles = req.files?.moreColors || [];

    // ======================
    // 1. MAIN IMAGE
    // ======================
    let mainImage = "";

    if (mainImageFile) {
      const upload = await cloudinary.uploader.upload(mainImageFile.path, {
        folder: "narayanam/products",
      });

      mainImage = upload.secure_url;

      if (fs.existsSync(mainImageFile.path)) {
        fs.unlinkSync(mainImageFile.path);
      }
    }

    // ======================
    // 2. GALLERY
    // ======================
    const galleryImages = [];

    if (galleryFiles.length > 0) {
      for (const file of galleryFiles) {
        const upload = await cloudinary.uploader.upload(file.path, {
          folder: "narayanam/products",
        });

        galleryImages.push(upload.secure_url);

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    // ======================
    // 3. MORE COLORS
    // ======================
    const moreColors = [];

    const moreColorsData = req.body.moreColorsData
      ? Array.isArray(req.body.moreColorsData)
        ? req.body.moreColorsData
        : [req.body.moreColorsData]
      : [];

    let fileIndex = 0;

    for (const item of moreColorsData) {
      const data = JSON.parse(item);

      // --- Thumbnail ---
      let thumbnail = "";

      if (moreColorFiles[fileIndex]) {
        const file = moreColorFiles[fileIndex];
        const upload = await cloudinary.uploader.upload(file.path, {
          folder: "narayanam/products/more-colors",
        });

        thumbnail = upload.secure_url;

        // FIX: Added exists check to prevent ENOENT crashes
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

        fileIndex++;
      }

      // --- Main Image ---
      let colorMainImage = "";

      if (moreColorFiles[fileIndex]) {
        const file = moreColorFiles[fileIndex];
        const upload = await cloudinary.uploader.upload(file.path, {
          folder: "narayanam/products/more-colors",
        });

        colorMainImage = upload.secure_url;

        // FIX: Added exists check
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

        fileIndex++;
      }

      // --- Gallery ---
      const gallery = [];
      const galleryCount = data.galleryCount || 0;

      for (let i = 0; i < galleryCount; i++) {
        if (!moreColorFiles[fileIndex]) break;

        const file = moreColorFiles[fileIndex];
        const upload = await cloudinary.uploader.upload(file.path, {
          folder: "narayanam/products/more-colors",
        });

        gallery.push(upload.secure_url);

        // FIX: Added exists check
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

        fileIndex++;
      }

      moreColors.push({
        color: data.color,
        thumbnail,
        mainImage: colorMainImage,
        galleryImages: gallery,
      });
    }

    // ======================
    // 4. CREATE PRODUCT
    // ======================
    const product = await Product.create({
      ...req.body,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      colors: req.body.colors ? JSON.parse(req.body.colors) : [],
      isTrending: req.body.isTrending === "true",

      isBestSeller: req.body.isBestSeller === "true",

      isLimitedStock: req.body.isLimitedStock === "true",

      shippingDays: Number(req.body.shippingDays) || 10,

      mainImage,
      galleryImages,
      moreColors,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE PRODUCT
// ==========================

export const updateProduct = async (req, res) => {
  console.log("UPDATE PRODUCT START");
  try {
    const existingProduct = await Product.findById(req.params.id);
    const moreColorFiles = req.files?.moreColors || [];
    console.log(req.body);
    console.log(req.files);
    console.log("More Color Files:", moreColorFiles.length);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ======================
    // 1. MAIN IMAGE
    // ======================
    let mainImage = existingProduct.mainImage;

    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "narayanam/products",
      });

      mainImage = uploadResult.secure_url;

      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }

    // ======================
    // 2. GALLERY IMAGES
    // ======================
    let galleryImages = existingProduct.galleryImages || [];

    if (req.files?.galleryImages?.length > 0) {
      const newGalleryImages = [];

      for (const file of req.files.galleryImages) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "narayanam/products",
        });

        newGalleryImages.push(uploadResult.secure_url);

        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      }

      galleryImages = [...galleryImages, ...newGalleryImages];
    }

    // ======================
    // 3. MORE COLORS
    // ======================
    let moreColors = existingProduct.moreColors || [];

    if (req.body.moreColorsData) {
      moreColors = []; // Reset to rebuild cleanly

      const moreColorsData = Array.isArray(req.body.moreColorsData)
        ? req.body.moreColorsData
        : [req.body.moreColorsData];

      let fileIndex = 0;

      for (const item of moreColorsData) {
        const data = JSON.parse(item);
        const currentIndex = moreColors.length; // Maps cleanly to the existing array

        // --- Thumbnail ---
        let thumbnail =
          existingProduct.moreColors?.[currentIndex]?.thumbnail || "";

        if (data.hasThumbnail) {
          const file = moreColorFiles[fileIndex];

          const upload = await cloudinary.uploader.upload(file.path, {
            folder: "narayanam/products/more-colors",
          });

          thumbnail = upload.secure_url;

          fs.unlinkSync(file.path);

          fileIndex++;
        }

        // --- Main Image ---
        let colorMainImage =
          existingProduct.moreColors?.[currentIndex]?.mainImage || "";

        if (data.hasMainImage) {
          const file = moreColorFiles[fileIndex];

          const upload = await cloudinary.uploader.upload(file.path, {
            folder: "narayanam/products/more-colors",
          });

          colorMainImage = upload.secure_url;

          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }

          fileIndex++;
        }

        // --- Gallery Images ---
        console.log("Processing Color:", data.color);
        console.log("Gallery Count:", data.galleryCount);
        console.log("Current File Index:", fileIndex);
        const gallery = [];
        const galleryCount = data.galleryCount || 0;

        for (let i = 0; i < galleryCount; i++) {
          console.log(
            "Uploading Gallery File:",
            moreColorFiles[fileIndex]?.originalname,
          );
          if (!moreColorFiles[fileIndex]) break;

          const file = moreColorFiles[fileIndex];
          const upload = await cloudinary.uploader.upload(file.path, {
            folder: "narayanam/products/more-colors",
          });

          gallery.push(upload.secure_url);
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // FIX: Added missing cleanup
          fileIndex++;
        }

        // FIX: Fallback to existing gallery images if no new ones are provided for this iteration
        const finalGalleryImages =
          gallery.length > 0
            ? gallery
            : existingProduct.moreColors?.[currentIndex]?.galleryImages || [];

        moreColors.push({
          color: data.color,
          thumbnail,
          mainImage: colorMainImage,
          galleryImages: finalGalleryImages,
        });
      }
    }

    // ======================
    // 4. UPDATE DATABASE
    // ======================
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        sizes: req.body.sizes
          ? JSON.parse(req.body.sizes)
          : existingProduct.sizes,
        colors: req.body.colors
          ? JSON.parse(req.body.colors)
          : existingProduct.colors,
        shippingDays:
          Number(req.body.shippingDays) || existingProduct.shippingDays,
        mainImage,
        galleryImages,
        moreColors,
      },
      {
        new: true, // Mongoose standard for returning the updated document
      },
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// DELETE PRODUCT
// ==========================
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

// ==========================
// GET SINGLE PRODUCT
// ==========================
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

// ==========================
// GET PRODUCT BY SLUG
// ==========================
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

// ==========================
// GET RELATED PRODUCTS
// ==========================
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

// ==========================
// GET TRENDING PRODUCTS
// ==========================
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isTrending: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      })
      .limit(8)
      .lean();

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

// ==========================
// GET BEST SELLER PRODUCTS
// ==========================
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

// ==========================
// GET LIMITED STOCK PRODUCTS
// ==========================
export const getLimitedStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isLimitedStock: true,
    })
      .populate("category")
      .sort({
        createdAt: -1,
      })
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

// ==========================
// UPDATE PRODUCT VIEWS
// ==========================
export const updateProductViews = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      {
        returnDocument: "after",
      },
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

// ==========================
// MOST VIEWED PRODUCTS
// ==========================
export const getMostViewedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({
        views: -1,
      })
      .limit(8);

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

// ==========================
// LIVE SEARCH PRODUCTS
// ==========================
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

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 })
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
