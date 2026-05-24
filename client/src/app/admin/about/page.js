"use client";

import {
  BadgeCheck,
  BookOpen,
  Building2,
  FileText,
  Globe2,
  Plus,
  Quote,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminAboutPage() {
  const [heroTitle, setHeroTitle] = useState("");

  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [storyTitle, setStoryTitle] = useState("");

  const [storyDescription, setStoryDescription] = useState("");

  const [missionTitle, setMissionTitle] = useState("");

  const [missionDescription, setMissionDescription] = useState("");

  const [founderMessage, setFounderMessage] = useState("");

  const [stats, setStats] = useState([
    {
      value: "",
      title: "",
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
      const res = await API.get("/about-settings");

      const data = res.data.data;

      if (!data) {
        setPageLoading(false);
        return;
      }

      setHeroTitle(data.heroTitle || "");

      setHeroSubtitle(data.heroSubtitle || "");

      setStoryTitle(data.storyTitle || "");

      setStoryDescription(data.storyDescription || "");

      setMissionTitle(data.missionTitle || "");

      setMissionDescription(data.missionDescription || "");

      setFounderMessage(data.founderMessage || "");

      setStats(
        data.stats || [
          {
            value: "",
            title: "",
          },
        ],
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

      await API.put("/about-settings", {
        heroTitle,
        heroSubtitle,
        storyTitle,
        storyDescription,
        missionTitle,
        missionDescription,
        founderMessage,
        stats,
      });

      toast.success("About page updated");
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
            Loading About Settings...
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
            Brand Story CMS
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
            "
          >
            About Page Management
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage your brand story, mission and company information
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
                  Brand Introduction
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
            </div>
          </div>

          {/* STORY */}
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
                <BookOpen size={22} />
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
                  Company Journey
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Story Section
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Story Title"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
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

              <textarea
                placeholder="Story Description"
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  min-h-[180px]
                  resize-none
                "
              />
            </div>
          </div>

          {/* MISSION */}
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
                <Globe2 size={22} />
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
                  Company Vision
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Mission Section
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Mission Title"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
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

              <textarea
                placeholder="Mission Description"
                value={missionDescription}
                onChange={(e) => setMissionDescription(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  min-h-[180px]
                  resize-none
                "
              />
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
                    Brand Achievements
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
                      title: "",
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
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...stats];

                      updated[index].title = e.target.value;

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

          {/* FOUNDER MESSAGE */}
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
                <Quote size={22} />
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
                  Founder Note
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Founder Message
                </h2>
              </div>
            </div>

            <textarea
              placeholder="Founder Message"
              value={founderMessage}
              onChange={(e) => setFounderMessage(e.target.value)}
              className="
                w-full
                border
                border-gray-200
                focus:border-black
                outline-none
                p-4
                rounded-2xl
                min-h-[220px]
                resize-none
              "
            />
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

            {loading ? "Saving..." : "Save About Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
