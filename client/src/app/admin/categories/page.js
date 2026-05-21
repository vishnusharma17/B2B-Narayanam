"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get("/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category Added");

      setName("");
      setImage(null);

      fetchCategories();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/categories/${id}`);

      toast.success("Category Deleted");

      fetchCategories();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-4 sm:p-6 md:p-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-light">Category Management</h1>

        <p className="text-gray-500 mt-2">Manage homepage categories</p>
      </div>

      {/* Add Category */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md mb-10">
        <h2 className="text-2xl mb-6">Add Category</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Category Name"
            className="border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            className="border p-3 rounded-xl"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          {/* Button */}
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
            Add Category
          </button>
        </form>
      </div>

      {/* Category List */}
      {loading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-md
                "
            >
              {/* Image */}
              <div className="h-[250px] bg-[#f5f5f5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                      w-full
                      h-full
                      object-cover
                      object-center
                    "
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-2xl font-semibold">{category.name}</h2>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="
                      mt-5
                      bg-red-500
                      text-white
                      px-5
                      py-2
                      rounded-xl
                      hover:bg-red-600
                      transition
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
