import { Inter, Playfair_Display } from "next/font/google";

import Script from "next/script";

import { Toaster } from "react-hot-toast";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Footer from "../components/layout/Footer";

import Navbar from "../components/layout/Navbar";

import "./globals.css";

import LoaderProvider from "./LoaderProvider";
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <LoaderProvider>
            <Navbar />

            {children}

            <Footer />
          </LoaderProvider>
          <Toaster position="top-right" />

          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
