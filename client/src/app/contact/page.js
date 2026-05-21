"use client";

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "",
    product_id: "",
    message: "",
  });

  const [contactData, setContactData] = useState(null);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactRes, productRes] = await Promise.all([
        API.get("/contact-settings"),
        API.get("/products?limit=500"),
      ]);

      setContactData(contactRes.data.data);

      setProducts(productRes.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      return toast.error("Please fill required fields");
    }

    try {
      setSubmitting(true);

      await API.post("/enquiry", formData);

      toast.success("Enquiry Submitted Successfully");

      setFormData({
        name: "",
        phone: "",
        quantity: "",
        product_id: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#f9f6f1]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-5" />

          <p className="text-lg font-medium">Loading Contact Page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f6f1] overflow-hidden">
      {/* HERO */}
      <section
        className="
          relative
          min-h-[75vh]
          flex
          items-center
          justify-center
          text-center
          px-4
        "
        style={{
          backgroundImage: `url(${contactData?.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl text-white">
          <p
            className="
              uppercase
              tracking-[5px]
              sm:tracking-[7px]
              text-[#D4AF37]
              text-xs
              sm:text-sm
              mb-5
            "
          >
            Wholesale Fashion Partner
          </p>

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-tight
            "
          >
            {contactData?.heroTitle || "Contact Narayanam"}
          </h1>

          <p
            className="
              mt-6
              text-gray-200
              max-w-2xl
              mx-auto
              leading-7
              text-sm
              sm:text-base
            "
          >
            {contactData?.heroSubtitle ||
              "Connect with us for premium wholesale ethnic collections and boutique partnerships."}
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <div>
            <p className="text-[#D4AF37] uppercase tracking-[5px] text-sm mb-4">
              Let’s Grow Together
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold
                text-black
                leading-tight
              "
            >
              Become Our
              <br />
              Wholesale Partner
            </h2>

            <p className="text-gray-600 leading-8 mt-6 text-base sm:text-lg">
              We supply premium handcrafted ethnic wear collections to
              boutiques, wholesalers and retailers across India with premium
              quality and fast delivery support.
            </p>

            {/* CONTACT CARDS */}
            <div className="mt-10 space-y-5">
              {/* PHONE */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-gray-100
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#D4AF37]/10
                    flex
                    items-center
                    justify-center
                    text-[#D4AF37]
                    shrink-0
                  "
                >
                  <Phone size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>

                  <h3 className="text-lg sm:text-xl font-semibold">
                    {contactData?.phone}
                  </h3>
                </div>
              </div>

              {/* EMAIL */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-gray-100
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#D4AF37]/10
                    flex
                    items-center
                    justify-center
                    text-[#D4AF37]
                    shrink-0
                  "
                >
                  <Mail size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>

                  <h3 className="text-lg sm:text-xl font-semibold break-all">
                    {contactData?.email}
                  </h3>
                </div>
              </div>

              {/* LOCATION */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                  border
                  border-gray-100
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-[#D4AF37]/10
                    flex
                    items-center
                    justify-center
                    text-[#D4AF37]
                    shrink-0
                  "
                >
                  <MapPin size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>

                  <h3 className="text-lg sm:text-xl font-semibold">
                    {contactData?.location}
                  </h3>
                </div>
              </div>
            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${contactData?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="
                  mt-8
                  bg-green-500
                  hover:bg-green-600
                  transition
                  duration-300
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  flex
                  items-center
                  gap-3
                  shadow-lg
                  hover:scale-105
                "
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </a>
          </div>

          {/* RIGHT FORM */}
          <div
            className="
              bg-white
              p-6
              sm:p-8
              lg:p-10
              rounded-[32px]
              shadow-xl
              border
              border-gray-100
            "
          >
            <p className="text-[#D4AF37] uppercase tracking-[5px] text-sm mb-3">
              Bulk Order Enquiry
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Send Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <input
                type="text"
                placeholder="Your Name *"
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  outline-none
                  focus:border-black
                  transition
                "
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              {/* PHONE */}
              <input
                type="text"
                placeholder="Phone Number *"
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  outline-none
                  focus:border-black
                  transition
                "
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

              {/* PRODUCT */}
              <select
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  outline-none
                  focus:border-black
                  transition
                  bg-white
                "
                value={formData.product_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    product_id: e.target.value,
                  })
                }
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {/* QUANTITY */}
              <input
                type="number"
                placeholder="Required Quantity"
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  outline-none
                  focus:border-black
                  transition
                "
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value,
                  })
                }
              />

              {/* MESSAGE */}
              <textarea
                rows="5"
                placeholder="Tell us about your requirements..."
                className="
                  w-full
                  border
                  border-gray-200
                  p-4
                  rounded-2xl
                  outline-none
                  focus:border-black
                  transition
                  resize-none
                "
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />

              {/* BUTTON */}
              <button
                disabled={submitting}
                className="
                  w-full
                  bg-[#7A1E1E]
                  hover:bg-black
                  transition
                  duration-300
                  text-white
                  py-4
                  rounded-full
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-3
                  disabled:opacity-60
                "
              >
                <Send size={18} />

                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
