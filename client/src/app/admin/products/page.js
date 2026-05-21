"use client";

import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import API from "../../../lib/api";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

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
  description: "",
  colors: [],
  sizes: [],
  mainImage: null,
  galleryImages: [],
  isTrending: false,
  isBestSeller: false,
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

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      setProducts(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      mainImage: file,
    }));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...files],
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorAdd = (color) => {
    if (formData.colors.includes(color)) return;

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
  };

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

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
      description: product.description || "",
      colors: product.colors || [],
      sizes: product.sizes || [],
      mainImage: product.mainImage || null,
      galleryImages: product.galleryImages || [],
      isTrending: product.isTrending || false,
      isBestSeller: product.isBestSeller || false,
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

  const resetForm = () => {
    setEditingId(null);

    setFormData(initialFormState);

    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = "";
    }
  };

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
        } else if (Array.isArray(formData[key])) {
          formPayload.append(key, JSON.stringify(formData[key]));
        } else {
          formPayload.append(key, formData[key]);
        }
      });

      if (descriptionRef.current) {
        formPayload.set("description", descriptionRef.current.innerHTML);
      }

      if (editingId) {
        await API.put(`/products/${editingId}`, formPayload, getAuthHeaders());

        toast.success("Product updated successfully");
      } else {
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
          ].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="border p-3 rounded-xl"
              value={formData[field]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
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

          {/* MAIN IMAGE */}
          <input
            type="file"
            onChange={handleMainImageUpload}
            className="md:col-span-2"
          />

          {/* GALLERY */}
          <input
            type="file"
            multiple
            onChange={handleGalleryUpload}
            className="md:col-span-2"
          />

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <div
              ref={descriptionRef}
              contentEditable
              className="min-h-[220px] border rounded-xl p-4"
            />
          </div>

          <button className="bg-black text-white py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition">
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
                <img
                  src={product.mainImage}
                  alt={product.name}
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

                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    {product.name}
                  </h3>

                  <p className="text-lg font-medium mt-1">
                    ₹{product.price_min}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Views:{" "}
                    <span className="font-semibold text-black">
                      {product.views || 0}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Stock:{" "}
                    <span className="font-medium">{product.stock || 0}</span>
                  </p>

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
