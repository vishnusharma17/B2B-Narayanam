"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await API.get("/reviews");

      setReviews(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/reviews", formData);

      alert("Review Added");

      setFormData({
        name: "",
        review: "",
        rating: "",
      });

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/reviews/${id}`);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-light mb-10">Review Management</h1>

      {/* Add Review */}
      <div className="bg-white p-8 rounded-3xl shadow-md mb-10">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <input
            type="text"
            placeholder="Customer Name"
            className="border p-3 rounded-xl"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Review"
            className="border p-3 rounded-xl"
            value={formData.review}
            onChange={(e) =>
              setFormData({
                ...formData,
                review: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Rating"
            className="border p-3 rounded-xl"
            value={formData.rating}
            onChange={(e) =>
              setFormData({
                ...formData,
                rating: e.target.value,
              })
            }
          />

          <button className="bg-black text-white py-3 rounded-xl">
            Add Review
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-6 rounded-3xl shadow-md flex justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{review.name}</h2>

              <p className="mt-2 text-gray-600">{review.review}</p>

              <p className="mt-2 text-[#C9A227]">{"★".repeat(review.rating)}</p>
            </div>

            <button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl h-fit"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
