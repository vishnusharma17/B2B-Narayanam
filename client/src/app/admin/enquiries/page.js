"use client";

import { Inbox, Mail, MessageSquare, Phone, Trash2, User2 } from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // =========================
  // FETCH ENQUIRIES
  // =========================

  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/enquiry");

      setEnquiries(res.data.data || []);
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
      await API.delete(`/enquiry/${id}`);

      toast.success("Enquiry deleted");

      fetchEnquiries();
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
            Loading Enquiries...
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
            Customer Support
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
            Customer Enquiries
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage customer messages and business enquiries
          </p>
        </div>

        {/* STATS */}
        <div className="mb-8">
          <div
            className="
              bg-white
              rounded-[28px]
              shadow-sm
              p-6
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
              <Inbox size={28} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Enquiries</p>

              <h2
                className="
                  text-3xl
                  font-bold
                  mt-1
                "
              >
                {enquiries.length}
              </h2>
            </div>
            
          </div>
        </div>

        {/* ENQUIRIES */}
        <div className="space-y-6">
          {enquiries.length === 0 ? (
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
                <MessageSquare size={36} />
              </div>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                No Enquiries Found
              </h2>

              <p className="text-gray-500 mt-3">
                Customer enquiries will appear here
              </p>
            </div>
          ) : (
            enquiries.map((item, index) => (
              <div
                key={item._id}
                className="
                    bg-white
                    rounded-[28px]
                    sm:rounded-[36px]
                    shadow-sm
                    p-5
                    sm:p-7
                    hover:shadow-md
                    transition
                  "
              >
                {/* TOP */}
                <div
                  className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-start
                      justify-between
                      gap-6
                    "
                >
                  {/* LEFT */}
                  <div className="flex-1">
                    {/* USER */}
                    <div className="flex items-center gap-4">
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
                        <p
                          className="
                              text-gray-400
                              text-xs
                              uppercase
                              tracking-[2px]
                              mb-1
                            "
                        >
                          Enquiry #{index + 1}
                        </p>

                        <h2
                          className="
                              text-xl
                              sm:text-2xl
                              font-semibold
                            "
                        >
                          {item.name}
                        </h2>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "new"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    {/* CONTACT INFO */}
                    <div
                      className="
                          grid
                          md:grid-cols-2
                          gap-4
                          mt-6
                        "
                    >
                      {/* PHONE */}
                      <div
                        className="
                            bg-[#F8F3EC]
                            p-4
                            rounded-2xl
                            flex
                            items-center
                            gap-3
                          "
                      >
                        <div
                          className="
                              w-10
                              h-10
                              rounded-xl
                              bg-white
                              flex
                              items-center
                              justify-center
                              text-[#7A1E1E]
                            "
                        >
                          <Phone size={18} />
                        </div>

                        <div>
                          <p
                            className="
                                text-gray-400
                                text-xs
                              "
                          >
                            Phone
                          </p>

                          <h3
                            className="
                                text-sm
                                sm:text-base
                                font-medium
                                break-all
                              "
                          >
                            {item.phone}
                          </h3>
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div
                        className="
                            bg-[#F8F3EC]
                            p-4
                            rounded-2xl
                            flex
                            items-center
                            gap-3
                          "
                      >
                        <div
                          className="
                              w-10
                              h-10
                              rounded-xl
                              bg-white
                              flex
                              items-center
                              justify-center
                              text-[#7A1E1E]
                            "
                        >
                          <Mail size={18} />
                        </div>

                        <div>
                          <p
                            className="
                                text-gray-400
                                text-xs
                              "
                          >
                            Email
                          </p>

                          <h3
                            className="
                                text-sm
                                sm:text-base
                                font-medium
                                break-all
                              "
                          >
                            {item.email}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-[#F8F3EC] p-4 rounded-2xl">
                        <p className="text-xs text-gray-400">Company</p>
                        <h3 className="font-medium">
                          {item.companyName || "-"}
                        </h3>
                      </div>

                      <div className="bg-[#F8F3EC] p-4 rounded-2xl">
                        <p className="text-xs text-gray-400">City</p>
                        <h3 className="font-medium">{item.city || "-"}</h3>
                      </div>

                      <div className="bg-[#F8F3EC] p-4 rounded-2xl">
                        <p className="text-xs text-gray-400">Inquiry Type</p>
                        <h3 className="font-medium">
                          {item.inquiryType || "-"}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-[#F8F3EC] p-4 rounded-2xl">
                      <p className="text-xs text-gray-400">Budget</p>
                      <h3 className="font-medium">{item.budget || "-"}</h3>
                    </div>

                    {/* MESSAGE */}
                    <div
                      className="
                          mt-6
                          bg-[#F8F3EC]
                          p-5
                          rounded-2xl
                        "
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare size={18} className="text-[#7A1E1E]" />

                        <p
                          className="
                              text-sm
                              font-medium
                            "
                        >
                          Customer Message
                        </p>
                      </div>

                      <p
                        className="
                            text-gray-700
                            leading-8
                            text-sm
                            sm:text-base
                            whitespace-pre-line
                          "
                      >
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* DELETE */}
                  <div
                    className="
                        lg:w-[280px] shrink-0
                      "
                  >
                    <select
                      value={item.priority || "medium"}
                      onChange={async (e) => {
                        await API.put(`/enquiry/${item._id}`, {
                          priority: e.target.value,
                        });

                        fetchEnquiries();
                      }}
                      className="border p-3 rounded-xl w-full mb-3"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>

                    <select
                      value={item.status}
                      onChange={async (e) => {
                        await API.put(`/enquiry/${item._id}`, {
                          status: e.target.value,
                        });

                        fetchEnquiries();
                      }}
                      className="border p-3 rounded-xl w-full mb-3"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                    {/* ACTIONS */}
                    <div className="flex flex-col gap-3 lg:w-[250px]">
                      {/* ASSIGNED TO */}
                      <input
                        type="text"
                        placeholder="Assigned To"
                        defaultValue={item.assignedTo || ""}
                        onBlur={async (e) => {
                          await API.put(`/enquiry/${item._id}`, {
                            assignedTo: e.target.value,
                          });

                          fetchEnquiries();
                        }}
                        className="
      border
      p-3
      rounded-xl
      w-full
    "
                      />

                      {/* NOTES */}
                      <textarea
                        rows={4}
                        placeholder="Internal Notes..."
                        defaultValue={item.notes || ""}
                        onBlur={async (e) => {
                          await API.put(`/enquiry/${item._id}`, {
                            notes: e.target.value,
                          });

                          fetchEnquiries();
                        }}
                        className="
      border
      p-3
      rounded-xl
      w-full
    "
                      />

                      {/* DELETE */}
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
    "
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
