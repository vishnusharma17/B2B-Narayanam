"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminShopRolesPage() {
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/shop-roles");

      setRoles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("title", formData.title);

      payload.append("link", formData.link);

      payload.append("image", formData.image);

      await API.post("/shop-roles", payload);

      toast.success("Role added successfully");

      setFormData({
        title: "",
        link: "",
        image: null,
      });

      fetchRoles();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add role");
    }
  };

  const deleteRole = async (id) => {
    try {
      await API.delete(`/shop-roles/${id}`);

      toast.success("Deleted successfully");

      fetchRoles();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Shop By Role</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-10 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Role Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Role Link"
          value={formData.link}
          onChange={(e) =>
            setFormData({
              ...formData,
              link: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          type="file"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
          className="md:col-span-2"
        />

        <button className="bg-black text-white py-3 rounded-xl md:col-span-2">
          Add Role
        </button>
      </form>

      {/* Roles List */}
      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role._id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img src={role.image} className="w-full h-56 object-cover" />

            <div className="p-4">
              <h3 className="font-bold text-lg">{role.title}</h3>

              <button
                onClick={() => deleteRole(role._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
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
