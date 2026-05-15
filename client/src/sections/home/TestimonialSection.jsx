"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] =
    useState([]);

  useEffect(() => {
    API.get("/testimonials")
      .then((res) => {
        setTestimonials(
          res.data.data
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (
    testimonials.length === 0
  )
    return null;

  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="text-center mb-14">
        <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm">
          Trusted By Retailers
        </p>

        <h2 className="text-5xl font-bold mt-4">
          Client Testimonials
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map(
          (item) => (
            <div
              key={item._id}
              className="bg-[#F9F6F1] p-8 rounded-3xl"
            >
              <img
                src={item.image}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />

              <h3 className="text-xl font-bold text-center mt-5">
                {item.name}
              </h3>

              <p className="text-gray-500 text-center">
                {item.company}
              </p>

              <p className="text-center text-[#D4AF37] mt-3">
                {"★".repeat(
                  item.rating
                )}
              </p>

              <p className="text-gray-600 text-center mt-5">
                {item.review}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}