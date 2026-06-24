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
          <div className="w-12 h-12 border-2 border-[#7A1E1E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-sm tracking-widest uppercase font-medium text-neutral-600">
            Loading Studio...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-6 sm:p-10 lg:p-16 pb-36 selection:bg-[#7A1E1E]/10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 lg:mb-16">
          <p className="uppercase tracking-[6px] text-[#C9A227] text-[10px] sm:text-xs font-bold mb-3">
            Boutique CMS
          </p>
          <h1 className="text-4xl lg:text-5xl font-extralight tracking-tight text-neutral-900">
            Contact Settings
          </h1>
          <p className="text-neutral-400 mt-3 text-sm font-light max-w-xl leading-relaxed">
            Refine your digital storefront assets and brand touchpoints with
            minimalist precision.
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* HERO SECTION CARD */}
          <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-neutral-100/60 space-y-8">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
              <div className="w-10 h-10 rounded-xl bg-[#7A1E1E]/5 flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[9px] font-bold">
                  01 / Canvas
                </p>
                <h2 className="text-lg font-medium text-neutral-800 tracking-tight">
                  Hero Section
                </h2>
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  Hero Title
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  placeholder="The Headline Statement"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none px-5 py-4 rounded-xl transition-all duration-200 font-medium text-neutral-800 text-sm placeholder-neutral-400 shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  Hero Subtitle
                </label>
                <textarea
                  name="heroSubtitle"
                  placeholder="A brief editorial description..."
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none px-5 py-4 rounded-xl min-h-[120px] resize-none transition-all duration-200 text-neutral-600 leading-relaxed text-sm placeholder-neutral-400 shadow-sm"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase ml-1 block">
                  Cover Aspect
                </label>
                <label className="border border-dashed border-neutral-200 hover:border-neutral-400 transition-colors rounded-2xl p-8 flex flex-col justify-center items-center cursor-pointer bg-neutral-50/40 group">
                  <ImagePlus
                    size={26}
                    className="text-neutral-400 group-hover:text-neutral-600 transition-colors mb-2"
                  />
                  <p className="font-medium text-xs text-neutral-700">
                    Select Banner Media
                  </p>
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    Recommended: 1920 × 900
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
                  <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 shadow-sm">
                    <img
                      src={heroImagePreview}
                      alt="preview"
                      className="w-full h-[180px] object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-neutral-100/60 space-y-8">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
              <div className="w-10 h-10 rounded-xl bg-[#7A1E1E]/5 flex items-center justify-center text-[#7A1E1E] shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="uppercase tracking-[2px] text-[#C9A227] text-[9px] font-bold">
                  02 / Connect
                </p>
                <h2 className="text-lg font-medium text-neutral-800 tracking-tight">
                  Contact Details
                </h2>
              </div>
            </div>

            {/* INPUTS GRID */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* PHONE */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  Primary Phone
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-2 border-neutral-200 pr-3 transition-colors group-focus-within:border-[#7A1E1E]">
                    <Phone
                      size={15}
                      className="text-neutral-400 group-focus-within:text-[#7A1E1E] transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Line details"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none pl-14 pr-4 py-4 rounded-xl transition-all duration-200 text-neutral-800 font-medium text-sm placeholder-neutral-400 shadow-sm"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  Email Identity
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-2 border-neutral-200 pr-3 transition-colors group-focus-within:border-[#7A1E1E]">
                    <Mail
                      size={15}
                      className="text-neutral-400 group-focus-within:text-[#7A1E1E] transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Concierge mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none pl-14 pr-4 py-4 rounded-xl transition-all duration-200 text-neutral-800 font-medium text-sm placeholder-neutral-400 shadow-sm"
                  />
                </div>
              </div>

              {/* LOCATION / CITY */}
              <div className="sm:col-span-2 space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  Boutique City / Location
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-2 border-neutral-200 pr-3 transition-colors group-focus-within:border-[#7A1E1E]">
                    <MapPin
                      size={15}
                      className="text-neutral-400 group-focus-within:text-[#7A1E1E] transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Maison address, City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none pl-14 pr-4 py-4 rounded-xl transition-all duration-200 text-neutral-800 font-medium text-sm placeholder-neutral-400 shadow-sm"
                  />
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="sm:col-span-2 space-y-3">
                <label className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase ml-1 block">
                  WhatsApp Chatline
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center border-r-2 border-neutral-200 pr-3 transition-colors group-focus-within:border-[#7A1E1E]">
                    <MessageCircle
                      size={15}
                      className="text-neutral-400 group-focus-within:text-[#7A1E1E] transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="whatsapp"
                    placeholder="Direct wave linkage"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full border-2 border-neutral-200/80 focus:border-[#7A1E1E] focus:ring-4 focus:ring-[#7A1E1E]/5 bg-white outline-none pl-14 pr-4 py-4 rounded-xl transition-all duration-200 text-neutral-800 font-medium text-sm placeholder-neutral-400 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BOTTOM BAR */}
        <div className="fixed bottom-8 left-0 right-0 z-50 px-6 pointer-events-none">
          <div className="max-w-6xl mx-auto flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="pointer-events-auto w-full sm:w-auto sm:px-14 bg-[#7A1E1E] hover:bg-neutral-900 text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40"
            >
              {loading ? "Synchronizing..." : "Commit Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
