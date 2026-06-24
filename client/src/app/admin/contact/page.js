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
      <div className="min-h-screen flex justify-center items-center bg-[#FAF6F0]">
        <div className="text-center">
          <div className="w-14 h-14 border-[3px] border-[#7A1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-lg font-medium text-neutral-800 tracking-wide">
            Loading Contact Settings...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] p-4 sm:p-6 lg:p-10 pb-32 selection:bg-[#7A1E1E]/10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 sm:mb-12 border-b border-neutral-200/50 pb-6">
          <p className="uppercase tracking-[5px] text-[#C9A227] text-[10px] sm:text-xs mb-2 font-bold">
            Contact CMS
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
            Contact Page Management
          </h1>
          <p className="text-neutral-500 mt-2.5 text-sm sm:text-base font-light">
            Easily manage hero banner assets and verified business touchpoints.
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* HERO SECTION CARD */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-neutral-100 space-y-8 transition-all duration-300 hover:shadow-md/50">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7A1E1E]/5 flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Building2 size={20} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[10px] font-bold">
                  Hero Banner
                </p>
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 tracking-tight">
                  Hero Section
                </h2>
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  Title
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  placeholder="Enter main headline"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none p-4 rounded-xl transition bg-neutral-50/30 font-medium text-neutral-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  Subtitle
                </label>
                <textarea
                  name="heroSubtitle"
                  placeholder="Enter supportive text description"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none p-4 rounded-xl min-h-[140px] resize-none transition bg-neutral-50/30 text-neutral-600 leading-relaxed"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1 block">
                  Background Media
                </label>
                <label className="border-2 border-dashed border-neutral-200 hover:border-neutral-400 focus-within:border-neutral-900 transition-colors rounded-2xl p-8 flex flex-col justify-center items-center cursor-pointer bg-neutral-50/50 group">
                  <ImagePlus
                    size={34}
                    className="text-neutral-400 group-hover:text-neutral-600 transition-colors mb-3"
                  />
                  <p className="font-semibold text-sm text-neutral-700">
                    Upload high-res banner
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">
                    Optimal resolution: 1920 × 900
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
                  <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200/60 shadow-sm relative group">
                    <img
                      src={heroImagePreview}
                      alt="preview"
                      className="w-full h-[180px] sm:h-[240px] object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-neutral-100 space-y-8 transition-all duration-300 hover:shadow-md/50">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7A1E1E]/5 flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[10px] font-bold">
                  Contact Information
                </p>
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 tracking-tight">
                  Contact Details
                </h2>
              </div>
            </div>

            {/* INPUTS GRID */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* PHONE */}
              <div className="relative sm:col-span-1 space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none pl-11 pr-4 py-3.5 rounded-xl transition bg-neutral-50/30 text-neutral-800 font-medium"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="relative sm:col-span-1 space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="office@business.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none pl-11 pr-4 py-3.5 rounded-xl transition bg-neutral-50/30 text-neutral-800 font-medium"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="relative sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  Physical Location
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="HQ Street address, Suite, City"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none pl-11 pr-4 py-3.5 rounded-xl transition bg-neutral-50/30 text-neutral-800 font-medium"
                  />
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="relative sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 tracking-wider uppercase ml-1">
                  WhatsApp Business
                </label>
                <div className="relative">
                  <MessageCircle
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="text"
                    name="whatsapp"
                    placeholder="WhatsApp line URL or number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 outline-none pl-11 pr-4 py-3.5 rounded-xl transition bg-neutral-50/30 text-neutral-800 font-medium"
                  />
                </div>
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
              className="pointer-events-auto w-full sm:w-auto sm:px-16 bg-[#7A1E1E] hover:bg-neutral-950 text-white py-4 rounded-full text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
