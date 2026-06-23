"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [desktopImage, setDesktopImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);

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

      if (desktopImage) {
        formData.append("desktopImage", desktopImage);
      }

      if (mobileImage) {
        formData.append("mobileImage", mobileImage);
      }

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
      setDesktopImage(null);
      setMobileImage(null);

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
    <div className="min-h-screen bg-[#F8F3EC] p-3 sm:p-5 lg:p-8">
      {/* Heading */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-light leading-tight">
          Category Management
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Manage homepage categories
        </p>
      </div>

      {/* Add Category */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-md mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl mb-5 sm:mb-6">Add Category</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Category Name"
            className="
              border
              p-3
              rounded-xl
              outline-none
              text-sm
              sm:text-base
            "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            className="
              border
              p-3
              rounded-xl
              outline-none
              text-sm
              sm:text-base
            "
            onChange={(e) => setDesktopImage(e.target.files[0])}
            required
            name="desktopImage"
            id="desktopImage"
            placeholder="Upload Desktop Image"
            label="Upload Desktop Image"
          />
          <input
            type="file"
            accept="image/*"
            className="
              border
              p-3
              rounded-xl
              outline-none
              text-sm
              sm:text-base
            "
            onChange={(e) => setMobileImage(e.target.files[0])}
            name="mobileImage"
            id="mobileImage"
            label="Upload Mobile Image"
            placeholder="Upload Mobile Image"
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
              text-sm
              sm:text-base
            "
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Category List */}
      {loading ? (
        <div className="text-lg sm:text-xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  shadow-md
                "
            >
              {/* Image */}
              <div className="h-[150px] sm:h-[220px] bg-[#f5f5f5] overflow-hidden">
                <img
                  src={category.desktopImage}
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
              <div className="p-3 sm:p-5">
                <h2 className="text-sm sm:text-xl font-semibold line-clamp-1">
                  {category.name}
                </h2>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="
                      mt-3
                      sm:mt-5
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      hover:bg-red-600
                      transition
                      text-xs
                      sm:text-sm
                      w-full
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
