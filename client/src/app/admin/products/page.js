"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

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
        // MAIN IMAGE
        if (key === "mainImage") {
          if (formData.mainImage instanceof File) {
            formPayload.append("mainImage", formData.mainImage);
          }
        }

        // GALLERY IMAGES
        else if (key === "galleryImages") {
          formData.galleryImages.forEach((img) => {
            if (img instanceof File) {
              formPayload.append("galleryImages", img);
            }
          });
        }

        // MORE COLORS
        else if (key === "moreColors") {
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
        }
        // ARRAYS
        else if (Array.isArray(formData[key])) {
          formPayload.append(key, JSON.stringify(formData[key]));
        }

        // CATEGORY
        else if (key === "category") {
          if (formData.category && formData.category !== "") {
            formPayload.append("category", formData.category);
          }
        }

        // NORMAL
        else {
          formPayload.append(key, formData[key]);
        }
      });

      // DESCRIPTION
      if (descriptionRef.current) {
        formPayload.set("description", descriptionRef.current.innerHTML);
      }

      // UPDATE
      if (editingId) {
        console.log("========== FORMDATA ==========");

        for (const pair of formPayload.entries()) {
          console.log(pair[0], pair[1]);
        }

        await API.put(`/products/${editingId}`, formPayload, getAuthHeaders());

        toast.success("Product updated successfully");
      }

      // CREATE
      else {
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
    <div>
      <h1 className="text-4xl font-semibold mb-8">Product Management</h1>

      {/* FORM */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl shadow mb-10">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {[
            "name",
            "slug",
            "price_min",
            "original_price",
            "discount_percentage",
            "stock",
            "moq",
            "sku",
            "shippingDays",
          ].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="border p-3 rounded-xl"
              value={formData[field]}
              onChange={(e) => {
                const value = e.target.value;

                setFormData((prev) => ({
                  ...prev,
                  [field]: value,

                  ...(field === "name" && {
                    slug: generateSlug(value),
                  }),
                }));
              }}
            />
          ))}

          {/* CATEGORY */}
          <div className="md:col-span-2">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="w-full border p-3 rounded-xl"
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
          <div className="md:col-span-2">
            <label className="block mb-3 font-semibold">Select Sizes</label>

            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`
                    px-5
                    py-2
                    rounded-xl
                    border
                    transition-all

                    ${
                      formData.sizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 hover:border-black"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-3">Add Colors</h3>

            <div className="flex flex-wrap gap-3 mb-4">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => handleColorAdd(color)}
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >
                  {color}
                </button>
              ))}
            </div>

            {/* SELECTED COLORS */}
            <div className="flex flex-wrap gap-3">
              {formData.colors.map((color, index) => (
                <div
                  key={index}
                  className="
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded-full
                      flex
                      items-center
                      gap-2
                    "
                >
                  {color}

                  <button type="button" onClick={() => removeColor(index)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isTrending: e.target.checked,
                }))
              }
            />

            <span>Show in Trending Section</span>
          </div>

          {/* BEST SELLER */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isBestSeller: e.target.checked,
                }))
              }
            />

            <span>Show in Best Seller Section</span>
          </div>

          {/* LIMITED STOCK */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isLimitedStock}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isLimitedStock: e.target.checked,
                }))
              }
            />

            <span>Show in Limited Stock Section</span>
          </div>

          {/* MAIN IMAGE */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Main Image</label>

            <input
              type="file"
              onChange={handleMainImageUpload}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* GALLERY */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Gallery Images</label>

            <input
              type="file"
              multiple
              onChange={handleGalleryUpload}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={addMoreColor}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              + Add More Color
            </button>
          </div>

          {formData.moreColors.map((item, index) => (
            <div
              key={index}
              className="md:col-span-2 border rounded-2xl p-5 mt-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  More Color #{index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeMoreColor(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>

              {/* Color Name */}
              <input
                type="text"
                placeholder="Color Name"
                value={item.color}
                onChange={(e) =>
                  updateMoreColor(index, "color", e.target.value)
                }
                className="w-full border p-3 rounded-xl mb-4"
              />

              {/* Thumbnail */}

              {item.thumbnail && (
                <img
                  src={
                    item.thumbnail instanceof File
                      ? URL.createObjectURL(item.thumbnail)
                      : item.thumbnail
                  }
                  alt="Thumbnail"
                  className="w-24 h-24 object-cover rounded-xl mb-3 border"
                />
              )}
              <label className="block mb-2 font-medium">Thumbnail Image</label>

              <input
                type="file"
                onChange={(e) =>
                  updateMoreColor(index, "thumbnail", e.target.files[0])
                }
                className="w-full border p-3 rounded-xl mb-4"
              />

              {/* Main Image */}

              {item.mainImage && (
                <img
                  src={
                    item.mainImage instanceof File
                      ? URL.createObjectURL(item.mainImage)
                      : item.mainImage
                  }
                  alt="Main"
                  className="w-32 h-40 object-cover rounded-xl mb-3 border"
                />
              )}
              <label className="block mb-2 font-medium">Main Image</label>

              <input
                type="file"
                onChange={(e) =>
                  updateMoreColor(index, "mainImage", e.target.files[0])
                }
                className="w-full border p-3 rounded-xl mb-4"
              />

              {/* Gallery */}
              <label className="block mb-2 font-medium">Gallery Images</label>

              <input
                type="file"
                multiple
                onChange={(e) => updateMoreGallery(index, e.target.files)}
                className="w-full border p-3 rounded-xl"
              />

              {item.galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {item.galleryImages.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={
                          img instanceof File ? URL.createObjectURL(img) : img
                        }
                        className="w-24 h-24 object-cover rounded-xl border"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData.moreColors];

                          updated[index].galleryImages = updated[
                            index
                          ].galleryImages.filter((_, i) => i !== imgIndex);

                          setFormData({
                            ...formData,
                            moreColors: updated,
                          });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Product Description
            </label>

            <div
              ref={descriptionRef}
              contentEditable
              className="
                min-h-[220px]
                border
                rounded-xl
                p-4
                outline-none
              "
            />
          </div>

          {/* BUTTON */}
          <button
            className="
              bg-black
              text-white
              py-3
              rounded-xl
              md:col-span-2
              hover:bg-gray-800
              transition
            "
          >
            {editingId ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>

      {/* PRODUCTS */}
      <h2 className="text-2xl font-semibold mb-6">Existing Products</h2>

      {loading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <div className="grid gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                bg-white
                p-4
                sm:p-5
                rounded-2xl
                shadow
                flex
                flex-col
                lg:flex-row
                lg:justify-between
                lg:items-center
                gap-5
              "
            >
              {/* LEFT */}
              <div className="flex gap-4 items-start sm:items-center">
                {product.mainImage ? (
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    onError={(e) => {
                      console.log("IMAGE ERROR:", product.mainImage);
                    }}
                    className="
      w-20
      h-20
      sm:w-24
      sm:h-24
      object-cover
      rounded-xl
      bg-gray-100
    "
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-xl"></div>
                )}

                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    {product.name}
                  </h3>

                  <p className="text-lg font-medium mt-1">
                    ₹{product.price_min}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Views:
                    <span className="font-semibold text-black ml-1">
                      {product.views || 0}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Stock:
                    <span className="font-medium ml-1">
                      {product.stock || 0}
                    </span>
                  </p>

                  {/* SIZES */}
                  {product.sizes?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="
                              bg-gray-100
                              text-black
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                            "
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* COLORS */}
                  {product.colors?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="
                              bg-black
                              text-white
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                            "
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.isTrending && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Trending
                      </span>
                    )}

                    {product.isBestSeller && (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                        Best Seller
                      </span>
                    )}

                    {product.isLimitedStock && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                        Limited Stock
                      </span>
                    )}

                    {(product.views || 0) > 20 && (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        Most Viewed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-3 w-full lg:w-auto">
                <button
                  onClick={() => handleEdit(product)}
                  className="
                    flex-1
                    lg:flex-none
                    bg-blue-500
                    hover:bg-blue-600
                    transition
                    text-white
                    px-5
                    py-3
                    rounded-xl
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="
                    flex-1
                    lg:flex-none
                    bg-red-500
                    hover:bg-red-600
                    transition
                    text-white
                    px-5
                    py-3
                    rounded-xl
                  "
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
