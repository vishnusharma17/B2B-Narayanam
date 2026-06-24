"use client";

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    inquiryType: "",
    product_id: "",
    quantity: "",
    preferredContact: "",
    budget: "",
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
        companyName: "",
        email: "",
        phone: "",
        city: "",
        inquiryType: "",
        product_id: "",
        quantity: "",
        preferredContact: "",
        budget: "",
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

  // Common styles for all text inputs and select elements to keep UI uniform
  const inputStyles = `
    w-full
    border
    border-gray-200
    p-4
    rounded-2xl
    outline-none
    focus:border-black
    transition
    text-sm
    sm:text-base
    bg-white
  `;

  return (
    <div className="min-h-screen bg-[#f9f6f1] overflow-hidden">
      {/* HERO */}
      <section
        className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${contactData?.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[650px] sm:h-[650px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl text-white">
          <p className="uppercase tracking-[4px] sm:tracking-[8px] text-[#D4AF37] text-[11px] sm:text-sm mb-5">
            Wholesale Fashion Partner
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1]">
            {contactData?.heroTitle || "Contact Narayanam"}
          </h1>
          <p className="mt-6 text-gray-200 max-w-3xl mx-auto leading-7 sm:leading-8 text-sm sm:text-lg px-2">
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
            <p className="text-[#D4AF37] uppercase tracking-[4px] sm:tracking-[6px] text-xs sm:text-sm mb-4">
              Let’s Grow Together
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-black leading-tight">
              Become Our
              <br />
              Wholesale Partner
            </h2>
            <p className="text-gray-600 leading-7 sm:leading-8 mt-6 text-sm sm:text-lg">
              We supply premium handcrafted ethnic wear collections to
              boutiques, wholesalers and retailers across India with premium
              quality and fast delivery support.
            </p>

            {/* CONTACT CARDS */}
            <div className="mt-10 space-y-5">
              {/* PHONE */}
              <div className="group bg-white rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <h3 className="text-base sm:text-xl font-semibold break-words">
                    {contactData?.phone}
                  </h3>
                </div>
              </div>

              {/* EMAIL */}
              <div className="group bg-white rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <h3 className="text-base sm:text-xl font-semibold break-all">
                    {contactData?.email}
                  </h3>
                </div>
              </div>

              {/* LOCATION */}
              <div className="group bg-white rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <h3 className="text-base sm:text-xl font-semibold break-words">
                    {contactData?.location}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <a
                href={`https://wa.me/${contactData?.whatsapp}`}
                target="_blank"
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-sm text-gray-500">Instant Response</p>
              </a>
              <a
                href={`tel:${contactData?.phone}`}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-sm text-gray-500">Business Support</p>
              </a>
              <a
                href={`mailto:${contactData?.email}`}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-gray-500">Sales Department</p>
              </a>
            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${contactData?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-8 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-7 sm:px-8 py-4 rounded-full font-medium flex items-center justify-center gap-3 shadow-lg hover:scale-105 w-full sm:w-fit">
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </a>
          </div>

          {/* RIGHT FORM */}
          <div className="relative bg-white p-6 sm:p-8 lg:p-10 rounded-[30px] sm:rounded-[40px] shadow-2xl border border-white/40 overflow-hidden">
            {/* FORM GLOW */}
            <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-[#D4AF37]/10 blur-[100px] rounded-full" />

            <div className="relative z-10">
              <p className="text-[#D4AF37] uppercase tracking-[4px] sm:tracking-[6px] text-xs sm:text-sm mb-3">
                Bulk Order Enquiry
              </p>
              <h2 className="text-3xl sm:text-5xl font-light mb-8 leading-tight">
                Send Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME */}
                <input
                  type="text"
                  placeholder="Your Name *"
                  className={inputStyles}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {/* PHONE */}
                <input
                  type="text"
                  placeholder="Phone Number *"
                  className={inputStyles}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className={inputStyles}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                {/* COMPANY NAME */}
                <input
                  type="text"
                  placeholder="Company / Boutique Name"
                  className={inputStyles}
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />

                {/* CITY */}
                <input
                  type="text"
                  placeholder="City"
                  className={inputStyles}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />

                {/* INQUIRY TYPE */}
                <select
                  className={inputStyles}
                  value={formData.inquiryType}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiryType: e.target.value })
                  }
                >
                  <option value="">Select Inquiry Type</option>
                  <option value="Wholesale">Wholesale Inquiry</option>
                  <option value="Bulk">Bulk Order</option>
                  <option value="Pricing">Pricing & MOQ</option>
                  <option value="Custom">Custom Design</option>
                  <option value="Partnership">Retail Partnership</option>
                  <option value="Support">Support</option>
                </select>

                {/* PRODUCT */}
                <select
                  className={inputStyles}
                  value={formData.product_id}
                  onChange={(e) =>
                    setFormData({ ...formData, product_id: e.target.value })
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
                  className={inputStyles}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />

                {/* BUDGET RANGE */}
                <select
                  className={inputStyles}
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                >
                  <option value="">Budget Range</option>
                  <option value="10000-50000">₹10k - ₹50k</option>
                  <option value="50000-100000">₹50k - ₹1L</option>
                  <option value="100000-500000">₹1L - ₹5L</option>
                  <option value="500000+">₹5L+</option>
                </select>

                {/* PREFERRED CONTACT */}
                <select
                  className={inputStyles}
                  value={formData.preferredContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredContact: e.target.value,
                    })
                  }
                >
                  <option value="">Preferred Contact</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="call">Phone Call</option>
                  <option value="email">Email</option>
                </select>

                {/* MESSAGE */}
                <textarea
                  rows="5"
                  placeholder="Tell us about your requirements..."
                  className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-black transition resize-none text-sm sm:text-base"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                {/* BUTTON */}
                <button
                  disabled={submitting}
                  className="w-full bg-[#7A1E1E] hover:bg-black transition-all duration-300 text-white py-4 rounded-full font-medium flex items-center justify-center gap-3 disabled:opacity-60 text-sm sm:text-base shadow-lg hover:scale-[1.01]"
                >
                  <Send size={18} />
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>

              {/* FAQ Section */}
              <div className="mt-16">
                <h2 className="text-3xl font-light mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <details className="bg-white p-5 rounded-2xl">
                    <summary className="cursor-pointer font-medium select-none">
                      What is minimum order quantity?
                    </summary>
                    <p className="mt-3 text-gray-600">
                      MOQ depends on product category.
                    </p>
                  </details>
                  <details className="bg-white p-5 rounded-2xl">
                    <summary className="cursor-pointer font-medium select-none">
                      Do you provide catalogue?
                    </summary>
                    <p className="mt-3 text-gray-600">
                      Yes, after enquiry submission.
                    </p>
                  </details>
                  <details className="bg-white p-5 rounded-2xl">
                    <summary className="cursor-pointer font-medium select-none">
                      Do you offer custom manufacturing?
                    </summary>
                    <p className="mt-3 text-gray-600">Yes, for bulk orders.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
