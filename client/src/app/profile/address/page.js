"use client";

import { Home, MapPin, Plus, Trash } from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    house: "",
    landmark: "",
    city: "",
    state: "",
    type: "Home",
  });

  // =========================
  // FETCH ADDRESSES
  // =========================

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await API.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedAddresses = res.data.data || [];

      setAddresses(fetchedAddresses);

      // SAVE LOCAL
      localStorage.setItem("userAddresses", JSON.stringify(fetchedAddresses));
    } catch (error) {
      console.log(error);

      // FALLBACK LOCAL
      const localAddresses =
        JSON.parse(localStorage.getItem("userAddresses")) || [];

      setAddresses(localAddresses);
    }
  };

  // =========================
  // SAVE ADDRESS
  // =========================

  const saveAddress = async () => {
    try {
      if (
        !form.fullName ||
        !form.phone ||
        !form.pincode ||
        !form.house ||
        !form.city ||
        !form.state
      ) {
        return toast.error("Please fill required fields");
      }

      const token = localStorage.getItem("userToken");

      await API.post("/address", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Address Saved Successfully");

      fetchAddresses();

      setForm({
        fullName: "",
        phone: "",
        pincode: "",
        house: "",
        landmark: "",
        city: "",
        state: "",
        type: "Home",
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to save address");
    }
  };

  // =========================
  // DELETE ADDRESS
  // =========================

  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("userToken");

      await API.delete(`/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Address Deleted");

      fetchAddresses();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        pt-[100px]
        sm:pt-[120px]
        px-4
        sm:px-6
        lg:px-8
        pb-14
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-[#D4AF37]
              text-[11px]
              sm:text-sm
              mb-3
            "
          >
            Saved Locations
          </p>

          <h1
            className="
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-light
              leading-tight
            "
          >
            Manage Addresses
          </h1>

          <p
            className="
              text-gray-500
              mt-4
              text-sm
              sm:text-base
              max-w-2xl
              mx-auto
              leading-7
            "
          >
            Save multiple addresses for faster checkout and smooth order
            delivery.
          </p>
        </div>

        <div
          className="
            grid
            lg:grid-cols-[420px_1fr]
            gap-6
            lg:gap-10
            items-start
          "
        >
          {/* ADD ADDRESS */}
          <div
            className="
              bg-white
              rounded-[28px]
              sm:rounded-[40px]
              p-5
              sm:p-8
              shadow-sm
              lg:sticky
              lg:top-28
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                mb-6
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  text-[#D4AF37]
                "
              >
                <Plus size={22} />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-medium
                  "
                >
                  Add New Address
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Fill your delivery details
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <input
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullName: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                "
              />

              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                "
              />

              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pincode: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                "
              />

              <textarea
                placeholder="House No / Street / Area"
                value={form.house}
                onChange={(e) =>
                  setForm({
                    ...form,
                    house: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  min-h-[110px]
                  text-sm
                  sm:text-base
                "
              />

              <input
                placeholder="Landmark"
                value={form.landmark}
                onChange={(e) =>
                  setForm({
                    ...form,
                    landmark: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                "
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                  className="
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    p-4
                    rounded-2xl
                    text-sm
                    sm:text-base
                  "
                />

                <input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      state: e.target.value,
                    })
                  }
                  className="
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    p-4
                    rounded-2xl
                    text-sm
                    sm:text-base
                  "
                />
              </div>

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  p-4
                  rounded-2xl
                  bg-white
                  text-sm
                  sm:text-base
                "
              >
                <option>Home</option>

                <option>Office</option>
              </select>

              <button
                onClick={saveAddress}
                className="
                  bg-black
                  hover:bg-[#222]
                  transition
                  text-white
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  font-medium
                  mt-2
                "
              >
                Save Address
              </button>
            </div>
          </div>

          {/* ADDRESS LIST */}
          <div>
            {addresses.length === 0 ? (
              <div
                className="
                  bg-white
                  rounded-[28px]
                  sm:rounded-[40px]
                  p-10
                  sm:p-16
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-full
                    bg-[#F8F3EC]
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-6
                    text-[#D4AF37]
                  "
                >
                  <MapPin size={40} />
                </div>

                <h2
                  className="
                    text-2xl
                    sm:text-4xl
                    font-light
                  "
                >
                  No Saved Addresses
                </h2>

                <p
                  className="
                    text-gray-500
                    mt-4
                    text-sm
                    sm:text-base
                    leading-7
                    max-w-md
                    mx-auto
                  "
                >
                  Add your delivery address to make checkout faster and easier.
                </p>
              </div>
            ) : (
              <>
                {/* COUNT */}
                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-5
                    sm:mb-6
                    gap-4
                    flex-wrap
                  "
                >
                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      font-light
                    "
                  >
                    Saved Addresses
                  </h2>

                  <p
                    className="
                      text-sm
                      sm:text-base
                      text-gray-500
                    "
                  >
                    {addresses.length} Address
                    {addresses.length > 1 ? "es" : ""}
                  </p>
                </div>

                <div className="grid gap-5 sm:gap-6">
                  {addresses.map((item) => (
                    <div
                      key={item._id}
                      className="
                          bg-white
                          rounded-[28px]
                          sm:rounded-[36px]
                          p-5
                          sm:p-7
                          shadow-sm
                          hover:shadow-xl
                          transition-all
                          duration-300
                          border
                          border-transparent
                          hover:border-[#D4AF37]/20
                        "
                    >
                      <div
                        className="
                            flex
                            justify-between
                            items-start
                            gap-4
                            mb-5
                          "
                      >
                        <div
                          className="
                              flex
                              items-center
                              gap-3
                            "
                        >
                          <div
                            className="
                                w-11
                                h-11
                                rounded-2xl
                                bg-[#F8F3EC]
                                flex
                                items-center
                                justify-center
                                text-[#D4AF37]
                              "
                          >
                            <Home size={20} />
                          </div>

                          <div>
                            <h2
                              className="
                                  font-semibold
                                  text-base
                                  sm:text-lg
                                "
                            >
                              {item.type}
                            </h2>

                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                              Delivery Address
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteAddress(item._id)}
                          className="
                              w-10
                              h-10
                              rounded-xl
                              bg-red-50
                              hover:bg-red-500
                              text-red-500
                              hover:text-white
                              transition-all
                              duration-300
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                        >
                          <Trash size={18} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <h3
                          className="
                              text-lg
                              sm:text-xl
                              font-medium
                              break-words
                            "
                        >
                          {item.fullName}
                        </h3>

                        <p
                          className="
                              text-gray-600
                              text-sm
                              sm:text-base
                            "
                        >
                          {item.phone}
                        </p>

                        <p
                          className="
                              text-gray-700
                              leading-7
                              text-sm
                              sm:text-base
                              break-words
                            "
                        >
                          {item.house}
                          {item.landmark && `, ${item.landmark}`}
                        </p>

                        <p
                          className="
                              text-gray-700
                              leading-7
                              text-sm
                              sm:text-base
                            "
                        >
                          {item.city}, {item.state} - {item.pincode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
