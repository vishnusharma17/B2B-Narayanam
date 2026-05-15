"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/categories", {
        name,
      });

      alert("Category Added");

      setName("");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/categories/${id}`);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-light mb-10">Category Management</h1>

      {/* Add Category */}
      <div className="bg-white p-8 rounded-3xl shadow-md mb-10">
        <h2 className="text-2xl mb-6">Add Category</h2>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            placeholder="Category Name"
            className="flex-1 border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="bg-black text-white px-6 rounded-xl">Add</button>
        </form>
      </div>

      {/* Category List */}
      <div className="grid gap-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white p-6 rounded-3xl shadow-md flex justify-between items-center"
          >
            <h2 className="text-2xl font-semibold">{category.name}</h2>

            <button
              onClick={() => handleDelete(category._id)}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
