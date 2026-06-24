"use client";

import {
  Building2,
  ImagePlus,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
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

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      const res = await API.get("/contact-settings");
      const data = res.data.data;

      if (!data) {
        setPageLoading(false);
        return;
      }

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
      toast.error("Failed to load data");
    } finally {
      setPageLoading(false);
    }
  };

  // =========================
  // IMAGE
  // =========================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      heroImage: file,
    }));

    setHeroImagePreview(URL.createObjectURL(file));
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE
  // =========================
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

  // =========================
  // LOADING
  // =========================
  if (pageLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8F3EC]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#7A1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">
            Loading Contact Settings...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-4 sm:p-6 lg:p-8 pb-28">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <p className="uppercase tracking-[4px] text-[#C9A227] text-[11px] sm:text-xs mb-2 font-semibold">
            Contact CMS
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
            Contact Page Management
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage hero banner and business contact details
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* HERO SECTION CARD */}
          <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-sm border border-gray-100/50 space-y-6">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F3EC] flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[10px] font-medium">
                  Hero Banner
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Hero Section
                </h2>
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-4">
              <input
                type="text"
                name="heroTitle"
                placeholder="Hero Title"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-black outline-none p-4 rounded-2xl transition bg-gray-50/30"
              />

              <textarea
                name="heroSubtitle"
                placeholder="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-black outline-none p-4 rounded-2xl min-h-[140px] resize-none transition bg-gray-50/30"
              />

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Hero Image
                </label>
                <label className="border-2 border-dashed border-gray-200 hover:border-black transition rounded-3xl p-8 flex flex-col justify-center items-center cursor-pointer bg-gray-50/50">
                  <ImagePlus size={38} className="text-gray-400 mb-3" />
                  <p className="font-medium text-sm text-gray-700">
                    Upload Hero Image
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Recommended: 1920x900
                  </p>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                {/* PREVIEW */}
                {heroImagePreview && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 shadow-inner">
                    <img
                      src={heroImagePreview}
                      alt="preview"
                      className="w-full h-[200px] sm:h-[260px] object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-sm border border-gray-100/50 space-y-6">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F3EC] flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[10px] font-medium">
                  Contact Information
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Contact Details
                </h2>
              </div>
            </div>

            {/* INPUTS GRID */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* PHONE */}
              <div className="relative sm:col-span-1">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-black outline-none pl-12 pr-4 py-4 rounded-2xl transition bg-gray-50/30"
                />
              </div>

              {/* EMAIL */}
              <div className="relative sm:col-span-1">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-black outline-none pl-12 pr-4 py-4 rounded-2xl transition bg-gray-50/30"
                />
              </div>

              {/* LOCATION */}
              <div className="relative sm:col-span-2">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Business Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-black outline-none pl-12 pr-4 py-4 rounded-2xl transition bg-gray-50/30"
                />
              </div>

              {/* WHATSAPP */}
              <div className="relative sm:col-span-2">
                <MessageCircle
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-black outline-none pl-12 pr-4 py-4 rounded-2xl transition bg-gray-50/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BOTTOM BAR */}
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="pointer-events-auto w-full sm:w-auto sm:px-14 bg-[#7A1E1E] hover:bg-black text-white py-4 rounded-full text-base font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
