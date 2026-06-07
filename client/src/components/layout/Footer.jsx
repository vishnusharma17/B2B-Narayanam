"use client";
import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await API.get("/footer-settings");
      setFooterData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter email");
    }

    try {
      setLoading(true);
      const res = await API.post("/newsletter", { email });
      toast.success(res.data.message || "Subscribed successfully");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  if (!footerData) {
    return (
      <div className="bg-yellow-500 text-white p-6 text-center font-semibold text-sm sm:text-base">
        FOOTER DATA NOT FOUND
      </div>
    );
  }

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background Ambient Glow - Scaled down dynamically on small screens */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-[#D4AF37]/10 blur-[100px] sm:blur-[150px] lg:blur-[180px] rounded-full pointer-events-none"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
        
        {/* TOP PARTNERSHIP BANNER */}
        <div className="bg-gradient-to-r from-[#D4AF37] via-[#f0d36f] to-[#D4AF37] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 text-center text-black mb-10 sm:mb-14 relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
            Partner With India's Premium Ethnic Wear Brand
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base opacity-90">
            Expand your business with exclusive ethnic collections, attractive wholesale pricing and PAN India delivery support.
          </p>
          <Link href="/wholesale" className="inline-block mt-5 sm:mt-6">
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#222] transition-all duration-300 font-medium text-xs sm:text-sm shadow-md hover:scale-105 transform">
              Explore Wholesale
            </button>
          </Link>
        </div>

        {/* 4-COLUMN RESPONSIVE CONTENT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 border-b border-white/10 pb-10">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-[3px] sm:tracking-[5px] text-[#D4AF37] font-semibold">
              NARAYANAM
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37]"></div>
            <p className="text-gray-500 italic text-xs sm:text-sm">
              Timeless Ethnic Elegance
            </p>
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm max-w-sm">
              Premium ethnic wear manufacturer trusted by boutiques, wholesalers and fashion retailers across India.
            </p>

            {/* SOCIAL MEDIA BUTTONS */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={footerData.instagramLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <FaInstagram className="text-sm sm:text-base" />
              </a>
              <a
                href={footerData.facebookLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <FaFacebookF className="text-xs sm:text-sm" />
              </a>
              <a
                href={footerData.youtubeLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <FaYoutube className="text-sm sm:text-base" />
              </a>
              <a
                href={footerData.whatsappLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <FaWhatsapp className="text-sm sm:text-base" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS COLUMN */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-white">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5 sm:gap-3 text-gray-400 text-xs sm:text-sm">
              <Link href="/" className="hover:text-[#D4AF37] transition-all duration-300">
                Home
              </Link>
              <Link href="/products" className="hover:text-[#D4AF37] transition-all duration-300">
                Collection
              </Link>
              <Link href="/wishlist" className="hover:text-[#D4AF37] transition-all duration-300">
                Wishlist
              </Link>
              <Link href="/cart" className="hover:text-[#D4AF37] transition-all duration-300">
                Cart
              </Link>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-all duration-300">
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT INFO COLUMN - UPDATED & ATTRACTIVE */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide relative pb-2 group">
              Contact Info
              <span className="absolute bottom-0 left-0 w-10 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-16"></span>
            </h3>
            
            <div className="space-y-4 text-gray-400">
              {/* ADDRESS */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-4 items-start group/item cursor-pointer hover:text-white transition-colors duration-300"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover/item:bg-[#D4AF37] group-hover/item:text-black transition-all duration-300 shrink-0 shadow-sm">
                  <MapPin size={16} className="sm:size-[18px]" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Our Showroom</span>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    {footerData.address}
                  </p>
                </div>
              </a>

              {/* PHONE */}
              <a 
                href={`tel:${footerData.phone}`}
                className="flex gap-4 items-center group/item cursor-pointer hover:text-white transition-colors duration-300"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover/item:bg-[#D4AF37] group-hover/item:text-black transition-all duration-300 shrink-0 shadow-sm">
                  <Phone size={16} className="sm:size-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Call / WhatsApp</span>
                  <p className="text-xs sm:text-sm font-medium tracking-wide break-all">
                    {footerData.phone}
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a 
                href={`mailto:${footerData.email}`}
                className="flex gap-4 items-center group/item cursor-pointer hover:text-white transition-colors duration-300"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover/item:bg-[#D4AF37] group-hover/item:text-black transition-all duration-300 shrink-0 shadow-sm">
                  <Mail size={16} className="sm:size-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Email Support</span>
                  <p className="text-xs sm:text-sm font-medium tracking-wide break-all">
                    {footerData.email}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 backdrop-blur-md self-start">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed text-xs sm:text-sm">
              Get latest product launches, wholesale offers and fashion updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-11 sm:h-12 rounded-xl px-4 text-black outline-none border-2 border-transparent focus:border-[#D4AF37] text-xs sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#c89d1e] transition-all duration-300 text-black py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 text-xs sm:text-sm"
              >
                <Send size={14} />
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM METADATA & LEGAL LINKS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-gray-500 text-[11px] sm:text-xs text-center sm:text-left order-2 sm:order-1">
            {footerData.copyrightText}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-[11px] sm:text-xs text-gray-500 order-1 sm:order-2">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-all duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-all duration-300">
              Terms & Conditions
            </Link>
            <Link href="/shipping-policy" className="hover:text-[#D4AF37] transition-all duration-300">
              Shipping Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}