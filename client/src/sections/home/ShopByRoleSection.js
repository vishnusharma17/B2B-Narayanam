"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function ShopByRoleSection() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/shop-roles");

      setRoles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (roles.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-10 bg-[#faf7f2]">
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[#C9A227] uppercase tracking-[4px] text-xs sm:text-sm mb-3">
          Business Categories
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          Shop By Role
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Find collections built for your business model
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Link key={role._id} href={role.link || "#"}>
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer">
              <img
                src={role.image}
                alt={role.title}
                className="w-full h-[280px] object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold">{role.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
