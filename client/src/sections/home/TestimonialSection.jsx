"use client";

import { Quote, Star } from "lucide-react";

import { useEffect, useState } from "react";

import API from "../../lib/api";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials =
    async () => {
      try {

        const res =
          await API.get(
            "/testimonials"
          );

        setTestimonials(
          res.data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // LOADING
  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 bg-white">
        
        <div className="text-center">
          
          <div className="w-14 h-14 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl sm:text-3xl font-semibold mt-6">
            Loading Testimonials...
          </h2>
        </div>
      </section>
    );
  }

  // NO TESTIMONIALS
  if (testimonials.length === 0)
    return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 bg-white overflow-hidden">
      
      {/* HEADING */}
      <div className="text-center mb-12 sm:mb-16">
        
        <p
          className="
            text-[#D4AF37]
            uppercase
            tracking-[4px]
            sm:tracking-[6px]
            text-xs
            sm:text-sm
            mb-4
          "
        >
          Trusted By Retailers
        </p>

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            leading-tight
          "
        >
          Client Testimonials
        </h2>

        <p
          className="
            text-gray-500
            mt-4
            max-w-2xl
            mx-auto
            text-sm
            sm:text-base
            leading-7
            px-2
          "
        >
          Hear what boutiques, retailers and fashion partners
          say about working with Narayanam.
        </p>
      </div>

      {/* TESTIMONIAL GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          sm:gap-6
        "
      >
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="
              bg-[#F9F6F1]
              rounded-3xl
              p-6
              sm:p-8
              relative
              hover:shadow-xl
              transition
              duration-300
            "
          >
            {/* QUOTE ICON */}
            <div
              className="
                absolute
                top-6
                right-6
                w-12
                h-12
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <Quote
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              
              <img
                src={item.image}
                alt={item.name}
                className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-md
                "
              />
            </div>

            {/* NAME */}
            <h3
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-center
                mt-6
              "
            >
              {item.name}
            </h3>

            {/* COMPANY */}
            <p
              className="
                text-gray-500
                text-center
                text-sm
                sm:text-base
                mt-1
              "
            >
              {item.company}
            </p>

            {/* STARS */}
            <div className="flex justify-center gap-1 mt-4">
              
              {[...Array(item.rating)].map(
                (_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="#D4AF37"
                    className="text-[#D4AF37]"
                  />
                )
              )}
            </div>

            {/* REVIEW */}
            <p
              className="
                text-gray-600
                text-center
                mt-6
                leading-7
                text-sm
                sm:text-base
              "
            >
              "{item.review}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}