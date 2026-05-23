"use client";

import { Home, Trash } from "lucide-react";
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
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-10">Manage Addresses</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* ADD ADDRESS */}
          <div className="bg-white p-8 rounded-3xl shadow-md">
            <h2 className="text-2xl mb-6">Add New Address</h2>

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
                className="border p-4 rounded-xl"
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
                className="border p-4 rounded-xl"
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
                className="border p-4 rounded-xl"
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
                className="border p-4 rounded-xl"
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
                className="border p-4 rounded-xl"
              />

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
                className="border p-4 rounded-xl"
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
                className="border p-4 rounded-xl"
              />

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="border p-4 rounded-xl"
              >
                <option>Home</option>
                <option>Office</option>
              </select>

              <button
                onClick={saveAddress}
                className="bg-black text-white py-4 rounded-xl hover:bg-[#222] transition"
              >
                Save Address
              </button>
            </div>
          </div>

          {/* ADDRESS LIST */}
          <div className="grid gap-6">
            {addresses.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl shadow-md text-center">
                No saved addresses
              </div>
            ) : (
              addresses.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-3xl shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Home size={20} />

                      <h2 className="font-semibold">{item.type}</h2>
                    </div>

                    <button onClick={() => deleteAddress(item._id)}>
                      <Trash size={20} className="text-red-500" />
                    </button>
                  </div>

                  <h3 className="font-semibold">{item.fullName}</h3>

                  <p>{item.phone}</p>

                  <p>
                    {item.house}, {item.landmark}
                  </p>

                  <p>
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
