"use client";

import { useEffect, useState } from "react";
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

  // fetch contact settings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactRes = await API.get("/contact-settings");
        const productRes = await API.get("/products");

        setContactData(contactRes.data.data);
        setProducts(productRes.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/enquiry", formData);

      alert("Enquiry Submitted Successfully");

      setFormData({
        name: "",
        phone: "",
        quantity: "",
        product_id: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${contactData?.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white px-6">
          <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
            Wholesale Partner
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">Contact Narayanam</h1>

          <p className="mt-6 text-gray-200 max-w-2xl mx-auto leading-8">
            Connect with us for premium wholesale ethnic collections, boutique
            partnerships and exclusive pricing.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left Content */}
          <div>
            <p className="text-[#D4AF37] uppercase tracking-[5px] text-sm mb-4">
              Let’s Grow Together
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Become Our Wholesale Partner
            </h2>

            <p className="text-gray-600 leading-8 text-lg">
              We supply premium handcrafted ethnic wear collections to
              retailers, boutiques and wholesalers across India.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-5">
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Phone</p>
                <h3 className="text-xl font-semibold">{contactData?.phone}</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Email</p>
                <h3 className="text-xl font-semibold">{contactData?.email}</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="text-gray-500 text-sm">Location</p>
                <h3 className="text-xl font-semibold">
                  {contactData?.location}
                </h3>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contactData?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full transition duration-300">
                Chat on WhatsApp
              </button>
            </a>
          </div>

          {/* Right Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <p className="text-[#D4AF37] uppercase tracking-[5px] text-sm mb-3">
              Bulk Order
            </p>

            <h2 className="text-3xl font-bold mb-8">Send Enquiry</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 p-4 rounded-xl"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              {/* Phone */}
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-200 p-4 rounded-xl"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

              {/* Product Dropdown */}
              <select
                className="w-full border border-gray-200 p-4 rounded-xl"
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

              {/* Quantity */}
              <input
                type="number"
                placeholder="Quantity"
                className="w-full border border-gray-200 p-4 rounded-xl"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value,
                  })
                }
              />

              {/* Message */}
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-200 p-4 rounded-xl"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />

              <button className="w-full bg-[#7A1E1E] hover:bg-black text-white py-4 rounded-full transition duration-300 font-medium">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
