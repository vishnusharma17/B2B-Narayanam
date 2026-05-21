"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(false);

  const [heroImagePreview, setHeroImagePreview] = useState("");

  const [formData, setFormData] = useState({
    heroTitle: "",

    heroSubtitle: "",

    heroImage: null,

    existingHeroImage: "",

    phone: "",

    email: "",

    location: "",

    whatsapp: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/contact-settings");

      const data = res.data.data;

      if (!data) return;

      setFormData({
        heroTitle: data.heroTitle || "",

        heroSubtitle: data.heroSubtitle || "",

        heroImage: null,

        existingHeroImage: data.heroImage || "",

        phone: data.phone || "",

        email: data.email || "",

        location: data.location || "",

        whatsapp: data.whatsapp || "",
      });

      setHeroImagePreview(data.heroImage || "");
    } catch (error) {
      console.log(error);
    }
  };

  // IMAGE
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      heroImage: file,
    }));

    setHeroImagePreview(URL.createObjectURL(file));
  };

  // INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SAVE
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("heroTitle", formData.heroTitle);

      payload.append("heroSubtitle", formData.heroSubtitle);

      payload.append("existingHeroImage", formData.existingHeroImage);

      payload.append("phone", formData.phone);

      payload.append("email", formData.email);

      payload.append("location", formData.location);

      payload.append("whatsapp", formData.whatsapp);

      if (formData.heroImage) {
        payload.append("heroImage", formData.heroImage);
      }

      await API.put("/contact-settings", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Contact page updated");

      fetchData();
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Contact Page Management</h1>

      <div className="bg-white p-8 rounded-3xl shadow space-y-10">
        {/* HERO */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Hero Section</h2>

          <div className="grid gap-4">
            <input
              type="text"
              name="heroTitle"
              placeholder="Hero Title"
              value={formData.heroTitle}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <textarea
              name="heroSubtitle"
              placeholder="Hero Subtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="border p-3 rounded-xl min-h-[120px]"
            />

            {/* IMAGE */}
            <div>
              <label className="font-medium block mb-3">Hero Image</label>

              <input
                type="file"
                onChange={handleImageUpload}
                className="border p-3 rounded-xl w-full"
              />
            </div>

            {/* PREVIEW */}
            {heroImagePreview && (
              <img
                src={heroImagePreview}
                alt="preview"
                className="
                  w-full
                  h-[280px]
                  object-cover
                  rounded-3xl
                  border
                "
              />
            )}
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Contact Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="
            bg-black
            hover:bg-gray-800
            transition
            text-white
            px-8
            py-4
            rounded-2xl
            w-full
            text-lg
          "
        >
          {loading ? "Saving..." : "Save Contact Page"}
        </button>
      </div>
    </div>
  );
}
