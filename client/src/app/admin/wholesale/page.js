"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminWholesalePage() {
  const [heroTitle, setHeroTitle] = useState("");

  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [heroImage, setHeroImage] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/wholesale-settings");

      const data = res.data.data;

      if (!data) return;

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
        ],
      );

      setProcessSteps(data.processSteps || [""]);

      setStats(
        data.stats || [
          {
            value: "",
            label: "",
          },
        ],
      );
    } catch (error) {
      console.log(error);

      toast.error("Failed to load data");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await API.put("/wholesale-settings", {
        heroTitle,
        heroSubtitle,
        heroImage,
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

  return (
    <div className="pb-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Wholesale Page Management
        </h1>

        <p className="text-gray-500 mt-2">Manage wholesale page dynamically</p>
      </div>

      <div className="space-y-8">
        {/* HERO SECTION */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">Hero Section</h2>

          <div className="grid gap-5">
            <input
              type="text"
              placeholder="Hero Title"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="
                border
                p-4
                rounded-2xl
                outline-none
                focus:border-black
              "
            />

            <textarea
              placeholder="Hero Subtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="
                border
                p-4
                rounded-2xl
                min-h-[130px]
                outline-none
                focus:border-black
              "
            />

            {/* IMAGE CHOOSE */}
            <div>
              <label className="block mb-3 font-medium">Hero Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    const imageUrl = URL.createObjectURL(file);

                    setHeroImage(imageUrl);
                  }
                }}
                className="
                  border
                  p-3
                  rounded-2xl
                  w-full
                  bg-white
                "
              />

              {/* PREVIEW */}
              {heroImage && (
                <img
                  src={heroImage}
                  alt="Preview"
                  className="
                    mt-5
                    w-full
                    max-w-3xl
                    h-[240px]
                    sm:h-[320px]
                    object-cover
                    rounded-3xl
                    border
                  "
                />
              )}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Stats Section</h2>

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
                text-sm
              "
            >
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
                  rounded-2xl
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
                  className="border p-4 rounded-2xl"
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
                  className="border p-4 rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Benefits</h2>

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
                text-sm
              "
            >
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
                  rounded-2xl
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
                    border
                    p-4
                    rounded-2xl
                    w-full
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
                    border
                    p-4
                    rounded-2xl
                    min-h-[120px]
                    w-full
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Process Steps</h2>

            <button
              type="button"
              onClick={() => setProcessSteps([...processSteps, ""])}
              className="
                bg-black
                text-white
                px-5
                py-3
                rounded-2xl
                text-sm
              "
            >
              Add Step
            </button>
          </div>

          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => {
                  const updated = [...processSteps];

                  updated[index] = e.target.value;

                  setProcessSteps(updated);
                }}
                className="
                  border
                  p-4
                  rounded-2xl
                  w-full
                "
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">CTA Section</h2>

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

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="
            w-full
            bg-black
            hover:bg-gray-800
            transition
            text-white
            py-5
            rounded-3xl
            text-lg
            font-medium
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Save Wholesale Page"}
        </button>
      </div>
    </div>
  );
}
