"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

const AVAILABLE_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
  "7XL",
];

const AVAILABLE_COLORS = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Yellow",
  "Purple",
  "Orange",
  "Brown",
];

const initialFormState = {
  name: "",
  slug: "",
  category: "",
  price_min: "",
  original_price: "",
  discount_percentage: "",
  stock: "",
  moq: "",
  sku: "",
  shippingDays: "",
  description: "",
  colors: [],
  sizes: [],
  mainImage: null,
  galleryImages: [],
  moreColors: [],
  isTrending: false,
  isBestSeller: false,
  isLimitedStock: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const descriptionRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // =========================
  // SLUG
  // =========================
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  // =========================
  // AUTH HEADERS
  // =========================
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      console.log(res.data.data);
      setProducts(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // =========================
  // MAIN IMAGE
  // =========================
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      mainImage: file,
    }));
  };

  // =========================
  // GALLERY
  // =========================
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...files],
    }));
  };

  const addMoreColor = () => {
    setFormData((prev) => ({
      ...prev,
      moreColors: [
        ...prev.moreColors,
        {
          color: "",
          thumbnail: null,
          mainImage: null,
          galleryImages: [],
        },
      ],
    }));
  };

  const removeMoreColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      moreColors: prev.moreColors.filter((_, i) => i !== index),
    }));
  };

  const updateMoreColor = (index, field, value) => {
    const updated = [...formData.moreColors];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      moreColors: updated,
    }));
  };

  const updateMoreGallery = (index, files) => {
    const updated = [...formData.moreColors];
    updated[index].galleryImages = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      moreColors: updated,
    }));
  };

  // =========================
  // SIZE TOGGLE
  // =========================
  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // =========================
  // COLOR ADD
  // =========================
  const handleColorAdd = (color) => {
    if (formData.colors.includes(color)) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
  };

  // =========================
  // REMOVE COLOR
  // =========================
  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category?._id || product.category || "",
      price_min: product.price_min || "",
      original_price: product.original_price || "",
      discount_percentage: product.discount_percentage || "",
      stock: product.stock || "",
      moq: product.moq || "",
      sku: product.sku || "",
      shippingDays: product.shippingDays || 10,
      description: product.description || "",
      colors: product.colors || [],
      sizes: product.sizes || [],
      mainImage: product.mainImage || null,
      galleryImages: product.galleryImages || [],
      moreColors:
        product.moreColors?.map((item) => ({
          color: item.color,
          thumbnail: item.thumbnail,
          mainImage: item.mainImage,
          galleryImages: item.galleryImages || [],
        })) || [],
      isTrending: product.isTrending || false,
      isBestSeller: product.isBestSeller || false,
      isLimitedStock: product.isLimitedStock || false,
    });

    setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.innerHTML = product.description || "";
      }
    }, 100);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // RESET
  // =========================
  const resetForm = () => {
    setEditingId(null);
    setFormData(initialFormState);
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = "";
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "mainImage") {
          if (formData.mainImage instanceof File) {
            formPayload.append("mainImage", formData.mainImage);
          }
        } else if (key === "galleryImages") {
          formData.galleryImages.forEach((img) => {
            if (img instanceof File) {
              formPayload.append("galleryImages", img);
            }
          });
        } else if (key === "moreColors") {
          formData.moreColors.forEach((item, index) => {
            formPayload.append(
              "moreColorsData",
              JSON.stringify({
                color: item.color,
                galleryCount: item.galleryImages.filter(
                  (img) => img instanceof File,
                ).length,
                hasThumbnail: item.thumbnail instanceof File,
                hasMainImage: item.mainImage instanceof File,
              }),
            );

            if (item.thumbnail instanceof File) {
              formPayload.append("moreColors", item.thumbnail);
            }
            if (item.mainImage instanceof File) {
              formPayload.append("moreColors", item.mainImage);
            }
            item.galleryImages.forEach((img) => {
              if (img instanceof File) {
                formPayload.append("moreColors", img);
              }
            });
          });
        } else if (Array.isArray(formData[key])) {
          formPayload.append(key, JSON.stringify(formData[key]));
        } else if (key === "category") {
          if (formData.category && formData.category !== "") {
            formPayload.append("category", formData.category);
          }
        } else {
          formPayload.append(key, formData[key]);
        }
      });

      if (descriptionRef.current) {
        formPayload.set("description", descriptionRef.current.innerHTML);
      }

      if (editingId) {
        console.log("========== FORMDATA ==========");
        for (const pair of formPayload.entries()) {
          console.log(pair[0], pair[1]);
        }
        await API.put(`/products/${editingId}`, formPayload, getAuthHeaders());
        toast.success("Product updated successfully");
      } else {
        console.log("========== FORMDATA ==========");
        for (const pair of formPayload.entries()) {
          console.log(pair[0], pair[1]);
        }
        await API.post("/products", formPayload, getAuthHeaders());
        toast.success("Product created successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`, getAuthHeaders());
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Product Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, update and manage store inventory
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {editingId ? "✏️ Edit Product Details" : "➕ Add New Product"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { id: "name", label: "Product Name", type: "text" },
              { id: "slug", label: "Slug URL", type: "text" },
              { id: "price_min", label: "Minimum Price (₹)", type: "number" },
              {
                id: "original_price",
                label: "Original Price (₹)",
                type: "number",
              },
              {
                id: "discount_percentage",
                label: "Discount (%)",
                type: "number",
              },
              { id: "stock", label: "Available Stock", type: "number" },
              { id: "moq", label: "MOQ (Min Order Qty)", type: "number" },
              { id: "sku", label: "SKU Code", type: "text" },
              {
                id: "shippingDays",
                label: "Shipping Est. (Days)",
                type: "number",
              },
            ].map((field) => (
              <div key={field.id} className="flex flex-col space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                  value={formData[field.id]}
                  // ✨ AUTO DISCOUNT LOGIC ADDED HERE ✨
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData((prev) => {
                      const updatedData = {
                        ...prev,
                        [field.id]: value,
                      };

                      if (field.id === "name") {
                        updatedData.slug = generateSlug(value);
                      }

                      if (
                        field.id === "price_min" ||
                        field.id === "original_price"
                      ) {
                        const original = parseFloat(
                          field.id === "original_price"
                            ? value
                            : prev.original_price,
                        );
                        const selling = parseFloat(
                          field.id === "price_min" ? value : prev.price_min,
                        );

                        if (
                          original > 0 &&
                          selling > 0 &&
                          original >= selling
                        ) {
                          const discount = Math.round(
                            ((original - selling) / original) * 100,
                          );
                          updatedData.discount_percentage = discount.toString();
                        } else {
                          updatedData.discount_percentage = "";
                        }
                      }

                      return updatedData;
                    });
                  }}
                />
              </div>
            ))}
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SIZES */}
          <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Select Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`
                    px-5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 shadow-xs
                    ${
                      formData.sizes.includes(size)
                        ? "bg-black text-white border-black scale-95"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Add Available Colors
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => handleColorAdd(color)}
                  className="px-4 py-1.5 text-xs font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-black hover:text-white hover:border-black transition duration-150"
                >
                  + {color}
                </button>
              ))}
            </div>

            {/* SELECTED COLORS */}
            {formData.colors.length > 0 && (
              <div className="pt-3 border-t border-gray-200/50">
                <span className="block text-[11px] font-bold text-gray-400 uppercase mb-2">
                  Selected:
                </span>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-xs"
                    >
                      <span>{color}</span>
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="bg-gray-700 hover:bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BADGES / CHECKBOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
            {[
              { id: "isTrending", label: "Show in Trending Section" },
              { id: "isBestSeller", label: "Show in Best Seller Section" },
              { id: "isLimitedStock", label: "Show in Limited Stock Section" },
            ].map((checkbox) => (
              <label
                key={checkbox.id}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50 select-none transition"
              >
                <input
                  type="checkbox"
                  checked={formData[checkbox.id]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [checkbox.id]: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded text-black focus:ring-black border-gray-300 transition"
                />
                <span className="text-xs font-medium text-gray-700">
                  {checkbox.label}
                </span>
              </label>
            ))}
          </div>

          {/* IMAGES UPLOAD SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Main Product Image
              </label>
              <div className="relative border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition">
                <input
                  type="file"
                  onChange={handleMainImageUpload}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gallery Images
              </label>
              <div className="relative border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryUpload}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* MORE COLORS VARIANT BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={addMoreColor}
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium text-sm transition shadow-2xs flex items-center justify-center gap-2"
            >
              ✨ Add Advanced Color Variant
            </button>
          </div>

          {/* MORE COLORS ACCORDION LIST */}
          {formData.moreColors.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              {formData.moreColors.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 shadow-2xs relative"
                >
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200/60">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                      🎨 Color Variant #{index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeMoreColor(index)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 transition"
                    >
                      Remove Variant
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                        Color Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Crimson Red"
                        value={item.color}
                        onChange={(e) =>
                          updateMoreColor(index, "color", e.target.value)
                        }
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Thumbnail Image */}
                      <div className="bg-white p-3 rounded-xl border border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
                          Variant Thumbnail
                        </label>
                        {item.thumbnail && (
                          <img
                            src={
                              item.thumbnail instanceof File
                                ? URL.createObjectURL(item.thumbnail)
                                : item.thumbnail
                            }
                            alt="Thumbnail"
                            className="w-16 h-16 object-cover rounded-lg mb-3 border border-gray-100"
                          />
                        )}
                        <input
                          type="file"
                          onChange={(e) =>
                            updateMoreColor(
                              index,
                              "thumbnail",
                              e.target.files[0],
                            )
                          }
                          className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                      </div>

                      {/* Main Image */}
                      <div className="bg-white p-3 rounded-xl border border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
                          Variant Main Image
                        </label>
                        {item.mainImage && (
                          <img
                            src={
                              item.mainImage instanceof File
                                ? URL.createObjectURL(item.mainImage)
                                : item.mainImage
                            }
                            alt="Main"
                            className="w-16 h-20 object-cover rounded-lg mb-3 border border-gray-100"
                          />
                        )}
                        <input
                          type="file"
                          onChange={(e) =>
                            updateMoreColor(
                              index,
                              "mainImage",
                              e.target.files[0],
                            )
                          }
                          className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                      </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
                        Variant Gallery Images
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          updateMoreGallery(index, e.target.files)
                        }
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />

                      {item.galleryImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                          {item.galleryImages.map((img, imgIndex) => (
                            <div key={imgIndex} className="relative group">
                              <img
                                src={
                                  img instanceof File
                                    ? URL.createObjectURL(img)
                                    : img
                                }
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formData.moreColors];
                                  updated[index].galleryImages = updated[
                                    index
                                  ].galleryImages.filter(
                                    (_, i) => i !== imgIndex,
                                  );
                                  setFormData({
                                    ...formData,
                                    moreColors: updated,
                                  });
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:bg-red-600 transition"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Product Description
            </label>
            <div
              ref={descriptionRef}
              contentEditable
              className="w-full min-h-[180px] bg-gray-50/50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-black focus:bg-white transition text-sm prose max-w-none shadow-inner"
            />
          </div>

          {/* FORM SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-base hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition active:scale-[0.99] shadow-md"
            >
              {editingId
                ? "✨ Update Product Information"
                : "🚀 Publish Product"}
            </button>
          </div>
        </form>
      </div>

      {/* PRODUCTS LIST SECTION */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Existing Inventory
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          List of live products currently showing on the storefront
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <div className="text-sm font-medium text-gray-500 animate-pulse">
            Fetching inventory items...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              {/* PRODUCT DATA */}
              <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                {product.mainImage ? (
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    onError={(e) =>
                      console.log("IMAGE ERROR:", product.mainImage)
                    }
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400 font-medium flex-shrink-0">
                    No Image
                  </div>
                )}

                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg text-gray-900 tracking-tight leading-snug">
                    {product.name}
                  </h3>
                  <div className="text-xl font-extrabold text-black">
                    ₹{product.price_min}
                  </div>

                  {/* STOCK & VIEWS METRICS */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1">
                      👀 Views:{" "}
                      <strong className="text-gray-800">
                        {product.views || 0}
                      </strong>
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1">
                      📦 Stock:{" "}
                      <strong
                        className={
                          product.stock > 0 ? "text-green-600" : "text-red-500"
                        }
                      >
                        {product.stock || 0} units
                      </strong>
                    </span>
                  </div>

                  {/* SIZES */}
                  {product.sizes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {product.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-gray-200/50"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* COLORS */}
                  {product.colors?.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="bg-gray-900 text-white px-2 py-0.5 rounded-md text-[10px] font-medium"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* PROMO BADGES */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {product.isTrending && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        🔥 Trending
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        🏆 Best Seller
                      </span>
                    )}
                    {product.isLimitedStock && (
                      <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        ⏳ Limited Stock
                      </span>
                    )}
                    {(product.views || 0) > 20 && (
                      <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        🌟 Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex sm:flex-row lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 lg:w-28 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-3 rounded-xl transition shadow-3xs"
                >
                  Edit Item
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 lg:w-28 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-3 rounded-xl transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
