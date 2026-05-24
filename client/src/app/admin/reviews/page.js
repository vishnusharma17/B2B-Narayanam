"use client";

import { MessageSquareQuote, Send, Star, Trash2, User2 } from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  // =========================
  // FETCH REVIEWS
  // =========================

  const fetchReviews = async () => {
    try {
      const res = await API.get("/reviews");

      setReviews(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD REVIEW
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.review || !formData.rating) {
        return toast.error("Please fill all fields");
      }

      setSubmitting(true);

      await API.post("/reviews", formData);

      toast.success("Review Added Successfully");

      setFormData({
        name: "",
        review: "",
        rating: "",
      });

      fetchReviews();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE REVIEW
  // =========================

  const handleDelete = async (id) => {
    try {
      await API.delete(`/reviews/${id}`);

      toast.success("Review deleted");

      fetchReviews();
    } catch (error) {
      console.log(error);

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
            Loading Reviews...
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
            Customer Feedback
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
            Review Management
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage customer testimonials and brand reviews
          </p>
        </div>

        {/* FORM */}
        <div
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
              <MessageSquareQuote size={22} />
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
                Customer Testimonial
              </p>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Add Review
              </h2>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label
                className="
                  text-sm
                  font-medium
                  mb-2
                  block
                "
              >
                Customer Name
              </label>

              <div className="relative">
                <User2
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
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
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

            {/* REVIEW */}
            <div>
              <label
                className="
                  text-sm
                  font-medium
                  mb-2
                  block
                "
              >
                Customer Review
              </label>

              <textarea
                placeholder="Write customer feedback..."
                rows={5}
                value={formData.review}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    review: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  resize-none
                "
              />
            </div>

            {/* RATING */}
            <div>
              <label
                className="
                  text-sm
                  font-medium
                  mb-2
                  block
                "
              >
                Rating (1-5)
              </label>

              <div className="relative">
                <Star
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-yellow-500
                  "
                />

                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Enter rating"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: e.target.value,
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

            {/* BUTTON */}
            <button
              type="submit"
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
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Send size={18} />

              {submitting ? "Adding Review..." : "Add Review"}
            </button>
          </form>
        </div>

        {/* REVIEW LIST */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div
              className="
                bg-white
                rounded-[28px]
                p-10
                text-center
                shadow-sm
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                No Reviews Found
              </h2>

              <p className="text-gray-500 mt-3">
                Customer reviews will appear here
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="
                    bg-white
                    rounded-[28px]
                    sm:rounded-[36px]
                    shadow-sm
                    p-5
                    sm:p-7
                    flex
                    flex-col
                    lg:flex-row
                    justify-between
                    gap-6
                  "
              >
                {/* LEFT */}
                <div className="flex-1">
                  {/* USER */}
                  <div className="flex items-start gap-4">
                    <div
                      className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-[#F8F3EC]
                          flex
                          items-center
                          justify-center
                          shrink-0
                          text-[#7A1E1E]
                        "
                    >
                      <User2 size={24} />
                    </div>

                    <div>
                      <h2
                        className="
                            text-xl
                            sm:text-2xl
                            font-semibold
                          "
                      >
                        {review.name}
                      </h2>

                      {/* STARS */}
                      <div
                        className="
                            flex
                            items-center
                            gap-1
                            mt-2
                          "
                      >
                        {[...Array(review.rating)].map((_, index) => (
                          <Star
                            key={index}
                            size={18}
                            className="
                                  fill-yellow-400
                                  text-yellow-400
                                "
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <div
                    className="
                        mt-5
                        bg-[#F8F3EC]
                        p-5
                        rounded-2xl
                      "
                  >
                    <p
                      className="
                          text-gray-700
                          leading-8
                          text-sm
                          sm:text-base
                        "
                    >
                      "{review.review}"
                    </p>
                  </div>
                </div>

                {/* DELETE */}
                <div
                  className="
                      flex
                      lg:block
                    "
                >
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="
                        bg-red-500
                        hover:bg-red-600
                        transition
                        text-white
                        px-5
                        py-3
                        rounded-2xl
                        flex
                        items-center
                        gap-2
                        h-fit
                        w-full
                        lg:w-auto
                        justify-center
                      "
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
