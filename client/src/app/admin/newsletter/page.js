"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminNewsletterPage() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await API.get("/newsletter");

      setEmails(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/newsletter/${id}`);

      fetchEmails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-light mb-10">Newsletter Subscribers</h1>

      <div className="grid gap-5">
        {emails.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-3xl shadow-md flex justify-between items-center"
          >
            <p className="text-xl">{item.email}</p>

            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
