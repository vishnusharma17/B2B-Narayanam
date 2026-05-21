"use client";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/about-settings");

      const data = res.data.data;

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
    }
  };

  const handleSave = async () => {
    try {
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
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">About Page Management</h1>

      <div className="bg-white p-8 rounded-3xl shadow space-y-10">
        {/* HERO */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Hero Section</h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Hero Title"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Hero Subtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="border p-3 rounded-xl min-h-[120px]"
            />
          </div>
        </div>

        {/* STORY */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Story Section</h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Story Title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Story Description"
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
              className="border p-3 rounded-xl min-h-[160px]"
            />
          </div>
        </div>

        {/* MISSION */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Mission Section</h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Mission Title"
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Mission Description"
              value={missionDescription}
              onChange={(e) => setMissionDescription(e.target.value)}
              className="border p-3 rounded-xl min-h-[160px]"
            />
          </div>
        </div>

        {/* STATS */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Stats</h2>

          <div className="space-y-4">
            {stats.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => {
                    const updated = [...stats];

                    updated[index].value = e.target.value;

                    setStats(updated);
                  }}
                  className="border p-3 rounded-xl"
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
                  className="border p-3 rounded-xl"
                />
              </div>
            ))}
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
              mt-4
              bg-black
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Add Stat
          </button>
        </div>

        {/* FOUNDER */}
        <div>
          <h2 className="text-2xl font-semibold mb-5">Founder Message</h2>

          <textarea
            placeholder="Founder Message"
            value={founderMessage}
            onChange={(e) => setFounderMessage(e.target.value)}
            className="border p-3 rounded-xl min-h-[160px] w-full"
          />
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-2xl
            w-full
            text-lg
          "
        >
          Save About Page
        </button>
      </div>
    </div>
  );
}
