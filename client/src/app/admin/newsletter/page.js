"use client";

import { BadgeCheck, Mail, Trash2, Users } from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminNewsletterPage() {
  const [emails, setEmails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails();
  }, []);

  // =========================
  // FETCH EMAILS
  // =========================

  const fetchEmails = async () => {
    try {
      const res = await API.get("/newsletter");

      setEmails(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    try {
      await API.delete(`/newsletter/${id}`);

      toast.success("Subscriber removed");

      fetchEmails();
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
            Loading Subscribers...
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
            Email Marketing
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
            Newsletter Subscribers
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage newsletter subscribers and email audience
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-6
            mb-8
          "
        >
          {/* TOTAL */}
          <div
            className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              gap-5
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#F8F3EC]
                flex
                items-center
                justify-center
                text-[#7A1E1E]
              "
            >
              <Users size={28} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Subscribers</p>

              <h2
                className="
                  text-3xl
                  font-bold
                  mt-1
                "
              >
                {emails.length}
              </h2>
            </div>
          </div>

          {/* ACTIVE */}
          <div
            className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              gap-5
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#F8F3EC]
                flex
                items-center
                justify-center
                text-green-600
              "
            >
              <BadgeCheck size={28} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Active Audience</p>

              <h2
                className="
                  text-3xl
                  font-bold
                  mt-1
                "
              >
                {emails.length}
              </h2>
            </div>
          </div>
        </div>

        {/* EMAIL LIST */}
        <div className="space-y-5">
          {emails.length === 0 ? (
            <div
              className="
                bg-white
                rounded-[28px]
                p-10
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-5
                  text-[#7A1E1E]
                "
              >
                <Mail size={36} />
              </div>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                No Subscribers Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Newsletter subscribers will appear here
              </p>
            </div>
          ) : (
            emails.map((item, index) => (
              <div
                key={item._id}
                className="
                    bg-white
                    rounded-[28px]
                    shadow-sm
                    p-5
                    sm:p-6
                    flex
                    flex-col
                    sm:flex-row
                    justify-between
                    sm:items-center
                    gap-5
                    hover:shadow-md
                    transition
                  "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  {/* ICON */}
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
                    <Mail size={24} />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <p
                      className="
                          text-gray-400
                          text-xs
                          uppercase
                          tracking-[2px]
                          mb-1
                        "
                    >
                      Subscriber #{index + 1}
                    </p>

                    <h2
                      className="
                          text-base
                          sm:text-xl
                          font-medium
                          break-all
                        "
                    >
                      {item.email}
                    </h2>
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(item._id)}
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
                      justify-center
                      gap-2
                      w-full
                      sm:w-auto
                    "
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
