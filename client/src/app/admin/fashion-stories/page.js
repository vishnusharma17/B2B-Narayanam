"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminFashionStoriesPage() {
  const [stories, setStories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await API.get("/fashion-stories");

      setStories(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("title", formData.title);

      payload.append("subtitle", formData.subtitle);

      payload.append("link", formData.link);

      payload.append("image", formData.image);

      await API.post("/fashion-stories", payload);

      toast.success("Story added successfully");

      setFormData({
        title: "",
        subtitle: "",
        link: "",
        image: null,
      });

      fetchStories();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add story");
    }
  };

  const deleteStory = async (id) => {
    try {
      await API.delete(`/fashion-stories/${id}`);

      toast.success("Story deleted");

      fetchStories();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Fashion Stories</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-10 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Title"
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
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({
              ...formData,
              subtitle: e.target.value,
            })
          }
          className="border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Link"
          value={formData.link}
          onChange={(e) =>
            setFormData({
              ...formData,
              link: e.target.value,
            })
          }
          className="border p-3 rounded-xl md:col-span-2"
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
          Add Story
        </button>
      </form>

      {/* Story List */}
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img src={story.image} className="w-full h-56 object-cover" />

            <div className="p-4">
              <h3 className="font-bold text-lg">{story.title}</h3>

              <p className="text-gray-500 text-sm mt-2">{story.subtitle}</p>

              <button
                onClick={() => deleteStory(story._id)}
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
