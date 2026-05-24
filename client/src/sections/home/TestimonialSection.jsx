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
      <section className="py-12 sm:py-16 bg-white">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-lg sm:text-2xl font-semibold mt-5">
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
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center mb-8 sm:mb-12">

          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-[10px]
              sm:text-xs
              mb-2
            "
          >
            Trusted By Retailers
          </p>

          <h2
            className="
              text-2xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
            "
          >
            Client Testimonials
          </h2>

          <p
            className="
              text-gray-500
              mt-3
              sm:mt-4
              max-w-2xl
              mx-auto
              text-xs
              sm:text-sm
              lg:text-base
              leading-6
              sm:leading-7
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
            gap-4
            sm:gap-6
          "
        >
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="
                bg-[#F9F6F1]
                rounded-2xl
                p-5
                sm:p-7
                relative
                hover:shadow-xl
                transition-all
                duration-300
              "
            >

              {/* QUOTE ICON */}
              <div
                className="
                  absolute
                  top-4
                  right-4
                  sm:top-6
                  sm:right-6
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-sm
                "
              >
                <Quote
                  size={18}
                  className="text-[#D4AF37]"
                />
              </div>

              {/* IMAGE */}
              <div className="flex justify-center">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-16
                    h-16
                    sm:w-20
                    sm:h-20
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
                  text-lg
                  sm:text-2xl
                  font-bold
                  text-center
                  mt-4
                  sm:mt-6
                "
              >
                {item.name}
              </h3>

              {/* COMPANY */}
              <p
                className="
                  text-gray-500
                  text-center
                  text-xs
                  sm:text-sm
                  mt-1
                "
              >
                {item.company}
              </p>

              {/* STARS */}
              <div className="flex justify-center gap-1 mt-3 sm:mt-4">

                {[...Array(item.rating)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={16}
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
                  mt-4
                  sm:mt-6
                  leading-6
                  sm:leading-7
                  text-xs
                  sm:text-sm
                  lg:text-base
                "
              >
                "{item.review}"
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}