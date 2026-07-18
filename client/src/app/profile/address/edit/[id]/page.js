"use client";

import { ArrowLeft, MapPin, Save } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../../../../lib/api";

export default function EditAddressPage() {
const router = useRouter();
const params = useParams();
const searchParams = useSearchParams();

const id = params.id;
const returnUrl = searchParams.get("return");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    if (id) fetchAddress();
  }, [id]);

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await API.get(`/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const address = res.data.data;
      setForm({
        fullName: address.fullName || "",
        phone: address.phone || "",
        pincode: address.pincode || "",
        house: address.house || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        type: address.type || "Home",
      });
    } catch (error) {
      toast.error("Failed to load address");
      router.push("/profile/address");
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.pincode ||
      !form.house ||
      !form.city ||
      !form.state
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("userToken");
      await API.put(`/address/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Address Updated Successfully");

      router.push(returnUrl || "/profile/address");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Address...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[110px] pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-[35px] shadow-sm p-6 sm:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#F8F3EC] flex items-center justify-center text-[#D4AF37]">
              <MapPin size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-light">Edit Address</h1>
              <p className="text-gray-500 mt-1">Update your delivery address</p>
            </div>
          </div>

          {/* Form Grid started here */}
          <div className="grid gap-5">
            <input
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
              />
              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
              />
            </div>

            <textarea
              placeholder="House No / Street / Area"
              value={form.house}
              onChange={(e) => setForm({ ...form, house: e.target.value })}
              className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl min-h-[100px] w-full"
            />

            <input
              placeholder="Landmark"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
              className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
              />
              <input
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl w-full"
              />
            </div>

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border border-gray-200 focus:border-black outline-none p-4 rounded-2xl bg-white w-full"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => router.push(returnUrl || "/profile/address")}
                className="flex-1 border border-gray-300 py-4 rounded-2xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateAddress}
                disabled={saving}
                className="flex-1 bg-black text-white py-4 rounded-2xl hover:bg-[#222] transition flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {saving ? "Updating..." : "Update Address"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
