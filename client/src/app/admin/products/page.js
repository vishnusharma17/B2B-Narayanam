"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    price_min: "",
    price_max: "",
    stock: "",
    moq: "",
    sku: "",
    description: "",
    images: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      category: "",
      price_min: "",
      price_max: "",
      stock: "",
      moq: "",
      sku: "",
      description: "",
      images: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        images: formData.images.split(",").map((img) => img.trim()),
      };

      if (editingId) {
        await API.put(`/products/${editingId}`, payload, getAuthHeaders());

        toast.success("Product Updated Successfully");
      } else {
        await API.post("/products", payload, getAuthHeaders());

        toast.success("Product Added Successfully");
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

      toast.success("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "",
      price_min: product.price_min || "",
      price_max: product.price_max || "",
      stock: product.stock || "",
      moq: product.moq || "",
      sku: product.sku || "",
      description: product.description || "",
      images: product.images?.join(",") || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-light mb-10">Product Management</h1>

      {/* Form */}
      <div className="bg-white p-8 rounded-3xl shadow-md mb-10">
        <h2 className="text-2xl mb-6">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              className="border p-3 rounded-xl"
              value={formData[field]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field]: e.target.value,
                })
              }
            />
          ))}

          <button className="bg-black text-white py-3 rounded-xl">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white py-3 rounded-xl"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Product List */}
      <div className="grid gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-3xl shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold">{product.name}</h2>

              <p>₹{product.price_min}</p>

              <p>Stock: {product.stock}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-5 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
