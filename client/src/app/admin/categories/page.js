"use client";

import {
  ImageIcon,
  LayoutGrid,
  Monitor,
  Plus,
  Smartphone,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [desktopImage, setDesktopImage] = useState(null);

  const [mobileImage, setMobileImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH CATEGORIES
  // =========================

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get("/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD CATEGORY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);

      if (desktopImage) {
        formData.append("desktopImage", desktopImage);
      }

      if (mobileImage) {
        formData.append("mobileImage", mobileImage);
      }

      await API.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category Added");

      setName("");

      setDesktopImage(null);

      setMobileImage(null);

      fetchCategories();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add category");
    }
  };

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete = async (id) => {
    try {
      await API.delete(`/categories/${id}`);

      toast.success("Category Deleted");

      fetchCategories();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#f7f5f1]
        p-3
        sm:p-6
        lg:p-8
        xl:p-10
      "
    >
      <div
        className="
          max-w-[1500px]
          mx-auto
        "
      >
        {/* =====================
            PAGE HEADER
        ====================== */}

        <div
          className="
            relative
            overflow-hidden
            bg-[#111111]
            rounded-[24px]
            sm:rounded-[32px]
            p-5
            sm:p-8
            lg:p-10
            mb-6
            sm:mb-8
            text-white
            shadow-xl
          "
        >
          {/* DECORATIVE GLOW */}

          <div
            aria-hidden="true"
            className="
              absolute
              -top-24
              -right-20
              w-64
              h-64
              bg-[#D4AF37]/20
              rounded-full
              blur-[80px]
              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  border
                  border-white/10
                  rounded-full
                  px-3
                  py-1.5
                  mb-4
                "
              >
                <LayoutGrid
                  size={14}
                  className="
                    text-[#D4AF37]
                  "
                />

                <span
                  className="
                    text-[10px]
                    sm:text-xs
                    uppercase
                    tracking-[2px]
                    text-gray-200
                  "
                >
                  Admin Dashboard
                </span>
              </div>

              <h1
                className="
                  text-2xl
                  sm:text-4xl
                  lg:text-5xl
                  font-light
                  leading-tight
                "
              >
                Category
                <span
                  className="
                    text-[#D4AF37]
                  "
                >
                  {" "}
                  Management
                </span>
              </h1>

              <p
                className="
                  text-xs
                  sm:text-sm
                  lg:text-base
                  text-gray-400
                  mt-3
                  max-w-xl
                  leading-6
                "
              >
                Create and manage the categories displayed on your website
                homepage.
              </p>
            </div>

            {/* TOTAL CATEGORY CARD */}

            <div
              className="
                w-full
                md:w-auto
                min-w-[190px]
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                rounded-2xl
                p-4
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-[#D4AF37]
                    text-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ImageIcon size={22} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Total Categories
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                    "
                  >
                    {categories.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================
            ADD CATEGORY FORM
        ====================== */}

        <div
          className="
            bg-white
            border
            border-[#ebe5dc]
            rounded-[24px]
            sm:rounded-[30px]
            shadow-sm
            overflow-hidden
            mb-8
            sm:mb-10
          "
        >
          {/* FORM HEADER */}

          <div
            className="
              flex
              items-center
              gap-4
              p-5
              sm:p-7
              border-b
              border-[#eee9e1]
              bg-gradient-to-r
              from-[#fffdf9]
              to-white
            "
          >
            <div
              className="
                w-11
                h-11
                sm:w-12
                sm:h-12
                rounded-2xl
                bg-black
                text-[#D4AF37]
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Plus size={22} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  sm:text-2xl
                  font-semibold
                  text-[#151515]
                "
              >
                Add New Category
              </h2>

              <p
                className="
                  text-[11px]
                  sm:text-sm
                  text-gray-500
                  mt-1
                "
              >
                Enter a category name and upload responsive banner images.
              </p>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              p-5
              sm:p-7
              lg:p-8
            "
          >
            {/* CATEGORY NAME */}

            <div
              className="
                mb-6
              "
            >
              <label
                htmlFor="categoryName"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-800
                  mb-2
                "
              >
                Category Name
              </label>

              <input
                id="categoryName"
                name="name"
                type="text"
                placeholder="Example: Sarees, Kurtis, Suits..."
                className="
                  w-full
                  h-12
                  sm:h-14
                  border
                  border-gray-200
                  bg-[#fafafa]
                  px-4
                  sm:px-5
                  rounded-xl
                  sm:rounded-2xl
                  outline-none
                  text-sm
                  sm:text-base
                  transition-all
                  duration-300
                  focus:bg-white
                  focus:border-[#D4AF37]
                  focus:ring-4
                  focus:ring-[#D4AF37]/10
                "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* IMAGE UPLOADS */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-5
                sm:gap-6
              "
            >
              {/* DESKTOP IMAGE */}

              <div
                className="
                  relative
                  border
                  border-dashed
                  border-gray-300
                  bg-[#faf9f7]
                  rounded-2xl
                  sm:rounded-3xl
                  p-5
                  sm:p-6
                  transition-all
                  duration-300
                  hover:border-[#D4AF37]
                  hover:bg-[#fffdf8]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                    mb-5
                  "
                >
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-black
                      text-[#D4AF37]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Monitor size={20} />
                  </div>

                  <div>
                    <label
                      htmlFor="desktopImage"
                      className="
                        block
                        text-sm
                        sm:text-base
                        font-semibold
                        text-gray-900
                      "
                    >
                      Desktop Banner
                    </label>

                    <p
                      className="
                        text-[11px]
                        sm:text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      Recommended: 1920 × 900 pixels
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="desktopImage"
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    min-h-[140px]
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    cursor-pointer
                    hover:border-[#D4AF37]
                    transition-all
                    duration-300
                    text-center
                    p-4
                  "
                >
                  <UploadCloud
                    size={30}
                    className="
                      text-[#b68d40]
                      mb-3
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    Choose Desktop Image
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-gray-400
                      mt-1
                    "
                  >
                    JPG, PNG or WEBP
                  </span>

                  {desktopImage && (
                    <span
                      className="
                        max-w-full
                        mt-3
                        px-3
                        py-1.5
                        rounded-full
                        bg-green-50
                        text-green-700
                        text-[10px]
                        sm:text-xs
                        truncate
                      "
                    >
                      {desktopImage.name}
                    </span>
                  )}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDesktopImage(e.target.files[0])}
                  required
                  name="desktopImage"
                  id="desktopImage"
                  className="sr-only"
                />
              </div>

              {/* MOBILE IMAGE */}

              <div
                className="
                  relative
                  border
                  border-dashed
                  border-gray-300
                  bg-[#faf9f7]
                  rounded-2xl
                  sm:rounded-3xl
                  p-5
                  sm:p-6
                  transition-all
                  duration-300
                  hover:border-[#D4AF37]
                  hover:bg-[#fffdf8]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                    mb-5
                  "
                >
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[#D4AF37]
                      text-black
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Smartphone size={20} />
                  </div>

                  <div>
                    <label
                      htmlFor="mobileImage"
                      className="
                        block
                        text-sm
                        sm:text-base
                        font-semibold
                        text-gray-900
                      "
                    >
                      Mobile Banner
                    </label>

                    <p
                      className="
                        text-[11px]
                        sm:text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      Recommended: 800 × 1200 pixels
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="mobileImage"
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    min-h-[140px]
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    cursor-pointer
                    hover:border-[#D4AF37]
                    transition-all
                    duration-300
                    text-center
                    p-4
                  "
                >
                  <UploadCloud
                    size={30}
                    className="
                      text-[#b68d40]
                      mb-3
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    Choose Mobile Image
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-gray-400
                      mt-1
                    "
                  >
                    JPG, PNG or WEBP
                  </span>

                  {mobileImage && (
                    <span
                      className="
                        max-w-full
                        mt-3
                        px-3
                        py-1.5
                        rounded-full
                        bg-green-50
                        text-green-700
                        text-[10px]
                        sm:text-xs
                        truncate
                      "
                    >
                      {mobileImage.name}
                    </span>
                  )}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMobileImage(e.target.files[0])}
                  name="mobileImage"
                  id="mobileImage"
                  required
                  className="sr-only"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="
                w-full
                mt-6
                sm:mt-8
                bg-black
                text-white
                min-h-[50px]
                sm:min-h-[56px]
                px-6
                rounded-xl
                sm:rounded-2xl
                hover:bg-[#D4AF37]
                hover:text-black
                transition-all
                duration-300
                text-sm
                sm:text-base
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
                shadow-black/10
              "
            >
              <Plus size={19} />
              Add Category
            </button>
          </form>
        </div>

        {/* =====================
            CATEGORY LIST HEADER
        ====================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-3
            mb-5
            sm:mb-7
          "
        >
          <div>
            <p
              className="
                uppercase
                tracking-[3px]
                text-[#a57d25]
                text-[10px]
                sm:text-xs
                font-semibold
                mb-2
              "
            >
              Homepage Collection
            </p>

            <h2
              className="
                text-xl
                sm:text-3xl
                font-semibold
                text-[#151515]
              "
            >
              All Categories
            </h2>
          </div>

          {!loading && (
            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
              "
            >
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"} available
            </p>
          )}
        </div>

        {/* =====================
            LOADING
        ====================== */}

        {loading ? (
          <div
            className="
              bg-white
              border
              border-[#ebe5dc]
              rounded-3xl
              min-h-[260px]
              flex
              flex-col
              items-center
              justify-center
              shadow-sm
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-full
                border-4
                border-[#eee6d6]
                border-t-[#D4AF37]
                animate-spin
              "
            />

            <p
              className="
                text-sm
                text-gray-500
                mt-5
              "
            >
              Loading categories...
            </p>
          </div>
        ) : categories.length === 0 ? (
          /* EMPTY STATE */

          <div
            className="
              bg-white
              border
              border-dashed
              border-gray-300
              rounded-3xl
              min-h-[300px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              p-6
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#f8f3ec]
                text-[#b68d40]
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <ImageIcon size={28} />
            </div>

            <h3
              className="
                text-lg
                sm:text-xl
                font-semibold
              "
            >
              No categories found
            </h3>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-2
                max-w-sm
              "
            >
              Add your first category using the form above.
            </p>
          </div>
        ) : (
          /* CATEGORY GRID */

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
              sm:gap-6
            "
          >
            {categories.map((category) => (
              <article
                key={category._id}
                className="
                    group
                    bg-white
                    rounded-[22px]
                    sm:rounded-[26px]
                    overflow-hidden
                    border
                    border-[#ebe5dc]
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
              >
                {/* CATEGORY IMAGE */}

                <div
                  className="
                      relative
                      h-[220px]
                      sm:h-[260px]
                      bg-[#f3eee7]
                      overflow-hidden
                    "
                >
                  <img
                    src={category.desktopImage}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="
                        w-full
                        h-full
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/50
                        via-transparent
                        to-transparent
                      "
                  />

                  {/* CATEGORY BADGE */}

                  <div
                    className="
                        absolute
                        top-4
                        left-4
                        bg-white/90
                        backdrop-blur-md
                        text-black
                        px-3
                        py-1.5
                        rounded-full
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[1px]
                        shadow-sm
                      "
                  >
                    Category
                  </div>
                </div>

                {/* CARD CONTENT */}

                <div
                  className="
                      p-4
                      sm:p-5
                    "
                >
                  <p
                    className="
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-[#a57d25]
                        font-semibold
                        mb-2
                      "
                  >
                    Homepage Collection
                  </p>

                  <h2
                    className="
                        text-base
                        sm:text-xl
                        font-semibold
                        text-[#151515]
                        line-clamp-1
                      "
                  >
                    {category.name}
                  </h2>

                  <button
                    type="button"
                    onClick={() => handleDelete(category._id)}
                    className="
                        mt-5
                        w-full
                        min-h-[44px]
                        bg-red-50
                        text-red-600
                        border
                        border-red-100
                        rounded-xl
                        hover:bg-red-600
                        hover:text-white
                        hover:border-red-600
                        transition-all
                        duration-300
                        text-xs
                        sm:text-sm
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                  >
                    <Trash2 size={16} />
                    Delete Category
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
