"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banners");

      setBanners(res.data.data || []);
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

      await API.post("/banners", payload);

      toast.success("Banner added successfully");

      setFormData({
        title: "",
        subtitle: "",
        link: "",
        image: null,
      });

      fetchBanners();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add banner");
    }
  };

  const deleteBanner = async (id) => {
    try {
      console.log("Deleting:", id);

      await API.delete(`/banners/${id}`);

      toast.success("Banner deleted");

      fetchBanners();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-4 sm:p-6 md:p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Hero Banners</h1>

        <p className="text-gray-500 mt-2">Manage homepage hero banners</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-4
          sm:p-6
          rounded-2xl
          shadow
          mb-10
          grid
          md:grid-cols-2
          gap-4
        "
      >
        <input
          type="text"
          placeholder="Banner Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="border p-3 rounded-xl w-full"
        />

        <input
          type="text"
          placeholder="Banner Subtitle"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({
              ...formData,
              subtitle: e.target.value,
            })
          }
          className="border p-3 rounded-xl w-full"
        />

        <input
          type="text"
          placeholder="Banner Link"
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

        <button
          className="
            bg-black
            text-white
            py-3
            rounded-xl
            md:col-span-2
            hover:bg-gray-800
            transition
          "
        >
          Add Banner
        </button>
      </form>

      {/* Banner List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="
                bg-white
                rounded-2xl
                shadow
                overflow-hidden
              "
          >
            {/* Fixed Banner Preview */}
            <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="
                    w-full
                    h-full
                    object-cover
                    object-center
                  "
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg">{banner.title}</h3>

              <p className="text-gray-500 text-sm mt-2">{banner.subtitle}</p>

              <button
                onClick={() => deleteBanner(banner._id)}
                className="
                    mt-4
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-600
                    transition
                  "
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
