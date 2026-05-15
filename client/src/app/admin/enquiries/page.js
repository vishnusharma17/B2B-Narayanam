"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/enquiry");

      setEnquiries(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/enquiry/${id}`);

      fetchEnquiries();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-light mb-10">Customer Enquiries</h1>

      <div className="grid gap-6">
        {enquiries.map((item) => (
          <div key={item._id} className="bg-white p-8 rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold">{item.name}</h2>

            <p className="mt-2">
              Phone:
              {item.phone}
            </p>

            <p className="mt-2">
              Email:
              {item.email}
            </p>

            <p className="mt-2">
              Message:
              {item.message}
            </p>

            <button
              onClick={() => handleDelete(item._id)}
              className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
