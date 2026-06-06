"use client";

import {
  BadgeCheck,
  Factory,
  FileText,
  Globe,
  ImagePlus,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminWholesalePage() {
  const [heroTitle, setHeroTitle] = useState("");

  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [heroImage, setHeroImage] = useState("");

  const [heroImageFile, setHeroImageFile] = useState(null);

  const [ctaTitle, setCtaTitle] = useState("");

  const [ctaButtonText, setCtaButtonText] = useState("");

  const [benefits, setBenefits] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  const [processSteps, setProcessSteps] = useState([""]);

  const [stats, setStats] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // FETCH DATA
  // =========================

  const fetchData = async () => {
    try {
      const res = await API.get("/wholesale-settings");

      const data = res.data.data;

      if (!data) {
        setPageLoading(false);
        return;
      }

      setHeroTitle(data.heroTitle || "");

      setHeroSubtitle(data.heroSubtitle || "");

      setHeroImage(data.heroImage || "");

      setCtaTitle(data.ctaTitle || "");

      setCtaButtonText(data.ctaButtonText || "");

      setBenefits(
        data.benefits || [
          {
            title: "",
            description: "",
          },
        ]
      );

      setProcessSteps(data.processSteps || [""]);

      setStats(
        data.stats || [
          {
            value: "",
            label: "",
          },
        ]
      );
    } catch (error) {
      console.log(error);

      toast.error("Failed to load data");
    } finally {
      setPageLoading(false);
    }
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    try {
      setLoading(true);

      let finalHeroImage = heroImage;

      if (heroImageFile) {
        const formData = new FormData();

        formData.append("images", heroImageFile);

        const uploadRes = await API.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        finalHeroImage = uploadRes.data.urls[0];
      }
      await API.put("/wholesale-settings", {
        heroTitle,
        heroSubtitle,
        heroImage: finalHeroImage,
        ctaTitle,
        ctaButtonText,
        benefits,
        processSteps,
        stats,
      });

      toast.success("Wholesale page updated");
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
            Loading Wholesale Settings...
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
            B2B Wholesale CMS
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
            "
          >
            Wholesale Page Management
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage wholesale landing page dynamically
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
            {/* TITLE */}
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
                <Factory size={22} />
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
                  Wholesale Hero
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
                placeholder="Hero Title"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
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
                placeholder="Hero Subtitle"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  min-h-[140px]
                  resize-none
                "
              />

              {/* HERO IMAGE */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setHeroImageFile(file);

                        const previewUrl = URL.createObjectURL(file);

                        setHeroImage(previewUrl);
                      }
                    }}
                  />
                </label>

                {/* PREVIEW */}
                {heroImage && (
                  <div
                    className="
                      mt-5
                      overflow-hidden
                      rounded-3xl
                      border
                    "
                  >
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="
                        w-full
                        h-[220px]
                        sm:h-[320px]
                        object-cover
                      "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STATS */}
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
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                mb-8
              "
            >
              <div className="flex items-center gap-3">
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
                  <BadgeCheck size={22} />
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
                    Business Numbers
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                    "
                  >
                    Stats Section
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setStats([
                    ...stats,
                    {
                      value: "",
                      label: "",
                    },
                  ])
                }
                className="
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Plus size={18} />
                Add Stat
              </button>
            </div>

            <div className="space-y-5">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="
                      grid
                      md:grid-cols-2
                      gap-4
                      bg-[#faf7f2]
                      p-5
                      rounded-3xl
                    "
                >
                  <input
                    type="text"
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => {
                      const updated = [...stats];

                      updated[index].value = e.target.value;

                      setStats(updated);
                    }}
                    className="
                        border
                        p-4
                        rounded-2xl
                      "
                  />

                  <input
                    type="text"
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...stats];

                      updated[index].label = e.target.value;

                      setStats(updated);
                    }}
                    className="
                        border
                        p-4
                        rounded-2xl
                      "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BENEFITS */}
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
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                mb-8
              "
            >
              <div className="flex items-center gap-3">
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
                  <Sparkles size={22} />
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
                    Wholesale Benefits
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                    "
                  >
                    Benefits Section
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setBenefits([
                    ...benefits,
                    {
                      title: "",
                      description: "",
                    },
                  ])
                }
                className="
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Plus size={18} />
                Add Benefit
              </button>
            </div>

            <div className="space-y-5">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="
                      bg-[#faf7f2]
                      p-5
                      rounded-3xl
                      space-y-4
                    "
                >
                  <input
                    type="text"
                    placeholder="Benefit Title"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...benefits];

                      updated[index].title = e.target.value;

                      setBenefits(updated);
                    }}
                    className="
                        w-full
                        border
                        p-4
                        rounded-2xl
                      "
                  />

                  <textarea
                    placeholder="Benefit Description"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...benefits];

                      updated[index].description = e.target.value;

                      setBenefits(updated);
                    }}
                    className="
                        w-full
                        border
                        p-4
                        rounded-2xl
                        min-h-[120px]
                        resize-none
                      "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PROCESS */}
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
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                mb-8
              "
            >
              <div className="flex items-center gap-3">
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
                  <Globe size={22} />
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
                    Process Timeline
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                    "
                  >
                    Process Steps
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setProcessSteps([...processSteps, ""])}
                className="
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Plus size={18} />
                Add Step
              </button>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="
                      flex
                      gap-3
                    "
                >
                  <div
                    className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        shrink-0
                        font-semibold
                      "
                  >
                    {index + 1}
                  </div>

                  <input
                    type="text"
                    placeholder={`Step ${index + 1}`}
                    value={step}
                    onChange={(e) => {
                      const updated = [...processSteps];

                      updated[index] = e.target.value;

                      setProcessSteps(updated);
                    }}
                    className="
                        flex-1
                        border
                        p-4
                        rounded-2xl
                      "
                  />

                  {processSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = processSteps.filter(
                          (_, i) => i !== index
                        );

                        setProcessSteps(updated);
                      }}
                      className="
                          w-12
                          h-12
                          rounded-2xl
                          bg-red-500
                          text-white
                          flex
                          items-center
                          justify-center
                        "
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
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
                <FileText size={22} />
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
                  Conversion CTA
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  CTA Section
                </h2>
              </div>
            </div>

            <div className="grid gap-5">
              <input
                type="text"
                placeholder="CTA Title"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className="
                  border
                  p-4
                  rounded-2xl
                "
              />

              <input
                type="text"
                placeholder="CTA Button Text"
                value={ctaButtonText}
                onChange={(e) => setCtaButtonText(e.target.value)}
                className="
                  border
                  p-4
                  rounded-2xl
                "
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
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

            {loading ? "Saving..." : "Save Wholesale Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
