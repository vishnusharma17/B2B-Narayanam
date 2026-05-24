"use client";

import {
  Briefcase,
  ImagePlus,
  Link2,
  PencilLine,
  Trash2,
  ImageIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminShopRolesPage() {
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  // =========================
  // FETCH ROLES
  // =========================

  const fetchRoles = async () => {
    try {
      const res = await API.get("/shop-roles");

      setRoles(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title || !formData.image) {
        return toast.error("Please fill required fields");
      }

      setSubmitting(true);

      const payload = new FormData();

      payload.append("title", formData.title);

      payload.append("link", formData.link);

      payload.append("image", formData.image);

      await API.post("/shop-roles", payload);

      toast.success("Role added successfully");

      setFormData({
        title: "",
        link: "",
        image: null,
      });

      setPreview("");

      fetchRoles();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add role");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteRole = async (id) => {
    try {
      await API.delete(`/shop-roles/${id}`);

      toast.success("Deleted successfully");

      fetchRoles();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
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
            Loading Shop Roles...
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
        {/* HEADING */}
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
            Homepage Collections
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
              leading-tight
            "
          >
            Shop By Role
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage role-based shopping collections for homepage
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-[28px]
            sm:rounded-[36px]
            shadow-sm
            p-5
            sm:p-8
            mb-8
            sm:mb-10
          "
        >
          {/* FORM HEADER */}
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
              <ImagePlus size={22} />
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
                Create Collection
              </p>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Add Shop Role
              </h2>
            </div>
          </div>

          <div
            className="
              grid
              lg:grid-cols-2
              gap-5
            "
          >
            {/* TITLE */}
            <div>
              <label
                className="
                  text-sm
                  font-medium
                  mb-2
                  block
                "
              >
                Role Title
              </label>

              <div className="relative">
                <Briefcase
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
                  placeholder="Enter role title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
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

            {/* LINK */}
            <div>
              <label
                className="
                  text-sm
                  font-medium
                  mb-2
                  block
                "
              >
                Redirect Link
              </label>

              <div className="relative">
                <Link2
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
                  placeholder="Enter collection link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      link: e.target.value,
                    })
                  }
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

            {/* IMAGE */}
            <div className="lg:col-span-2">
              <label
                className="
                  text-sm
                  font-medium
                  mb-3
                  block
                "
              >
                Upload Role Image
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
                <ImageIcon size={42} className="text-gray-400 mb-4" />

                <p className="font-medium">Click to upload image</p>

                <p className="text-gray-500 text-sm mt-2 text-center">
                  Recommended size: 1000x1200
                </p>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    setFormData({
                      ...formData,
                      image: file,
                    });

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            {/* PREVIEW */}
            {preview && (
              <div className="lg:col-span-2">
                <div
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                  "
                >
                  <img
                    src={preview}
                    alt=""
                    className="
                      w-full
                      aspect-[4/5]
                      object-cover
                      max-h-[500px]
                    "
                  />
                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="lg:col-span-2">
              <button
                disabled={submitting}
                className="
                  w-full
                  bg-black
                  hover:bg-[#222]
                  disabled:opacity-70
                  transition
                  text-white
                  py-4
                  rounded-2xl
                  font-medium
                  text-sm
                  sm:text-base
                "
              >
                {submitting ? "Adding Role..." : "Add Shop Role"}
              </button>
            </div>
          </div>
        </form>

        {/* ROLES LIST */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {roles.map((role) => (
            <div
              key={role._id}
              className="
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
            >
              {/* IMAGE */}
              <div
                className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    bg-gray-100
                  "
              >
                <img
                  src={role.image}
                  alt={role.title}
                  className="
                      w-full
                      h-full
                      object-cover
                      transition
                      duration-500
                      hover:scale-105
                    "
                />

                <div
                  className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/70
                      via-black/10
                      to-transparent
                    "
                />

                <div
                  className="
                      absolute
                      bottom-4
                      left-4
                      right-4
                      text-white
                    "
                >
                  <h3
                    className="
                        text-xl
                        sm:text-2xl
                        font-semibold
                        leading-snug
                      "
                  >
                    {role.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div
                  className="
                      bg-[#F8F3EC]
                      p-4
                      rounded-2xl
                      mb-5
                    "
                >
                  <p
                    className="
                        text-gray-500
                        text-xs
                        uppercase
                        tracking-[2px]
                        mb-2
                      "
                  >
                    Redirect Link
                  </p>

                  <p
                    className="
                        text-sm
                        break-all
                        text-gray-700
                      "
                  >
                    {role.link || "No link added"}
                  </p>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteRole(role._id)}
                  className="
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-red-500
                      hover:bg-red-600
                      transition
                      text-white
                      py-3.5
                      rounded-2xl
                    "
                >
                  <Trash2 size={18} />
                  Delete Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
