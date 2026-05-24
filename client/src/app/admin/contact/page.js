"use client";

import {
  Globe,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Save,
  UploadCloud,
  MessageCircle,
  Building2,
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
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#F8F3EC]
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-[#7A1E1E]
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            "
          />

          <h2
            className="
              text-xl
              sm:text-2xl
              font-medium
            "
          >
            Loading Contact Settings...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        p-4
        sm:p-6
        lg:p-8
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <p
            className="
              uppercase
              tracking-[4px]
              text-[#C9A227]
              text-[11px]
              sm:text-xs
              mb-2
            "
          >
            Contact CMS
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
            "
          >
            Contact Page Management
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage hero banner and business contact details
          </p>
        </div>

        <div className="space-y-8">
          {/* HERO SECTION */}
          <div
            className="
              bg-white
              rounded-[28px]
              sm:rounded-[36px]
              p-5
              sm:p-8
              shadow-sm
            "
          >
            {/* SECTION HEADER */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  text-[#7A1E1E]
                "
              >
                <Building2 size={22} />
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#C9A227]
                    text-[10px]
                  "
                >
                  Hero Banner
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Hero Section
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {/* HERO TITLE */}
              <input
                type="text"
                name="heroTitle"
                placeholder="Hero Title"
                value={formData.heroTitle}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                "
              />

              {/* HERO SUBTITLE */}
              <textarea
                name="heroSubtitle"
                placeholder="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  min-h-[150px]
                  resize-none
                "
              />

              {/* IMAGE */}
              <div>
                <label
                  className="
                    text-sm
                    font-medium
                    block
                    mb-3
                  "
                >
                  Hero Image
                </label>

                <label
                  className="
                    border-2
                    border-dashed
                    border-gray-300
                    hover:border-black
                    transition
                    rounded-3xl
                    p-8
                    flex
                    flex-col
                    justify-center
                    items-center
                    cursor-pointer
                    bg-[#fafafa]
                  "
                >
                  <ImagePlus
                    size={42}
                    className="
                      text-gray-400
                      mb-4
                    "
                  />

                  <p className="font-medium">Upload Hero Image</p>

                  <p
                    className="
                      text-gray-500
                      text-sm
                      mt-2
                    "
                  >
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
                  <div
                    className="
                      mt-5
                      overflow-hidden
                      rounded-3xl
                      border
                    "
                  >
                    <img
                      src={heroImagePreview}
                      alt="preview"
                      className="
                        w-full
                        h-[240px]
                        sm:h-[340px]
                        object-cover
                      "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div
            className="
              bg-white
              rounded-[28px]
              sm:rounded-[36px]
              p-5
              sm:p-8
              shadow-sm
            "
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  text-[#7A1E1E]
                "
              >
                <Phone size={22} />
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#C9A227]
                    text-[10px]
                  "
                >
                  Contact Information
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Contact Details
                </h2>
              </div>
            </div>

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
              "
            >
              {/* PHONE */}
              <div className="relative">
                <Phone
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                  "
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                  "
                />
              </div>

              {/* LOCATION */}
              <div className="relative">
                <MapPin
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Business Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                  "
                />
              </div>

              {/* WHATSAPP */}
              <div className="relative">
                <MessageCircle
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                  "
                />
              </div>
            </div>
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="
              w-full
              bg-black
              hover:bg-[#222]
              transition
              text-white
              py-5
              rounded-[28px]
              text-lg
              font-medium
              disabled:opacity-50
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <Save size={22} />

            {loading ? "Saving..." : "Save Contact Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
