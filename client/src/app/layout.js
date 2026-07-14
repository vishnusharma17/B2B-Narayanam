import { Inter, Playfair_Display } from "next/font/google";

import { Toaster } from "react-hot-toast";

import Footer from "../components/layout/Footer";

import Navbar from "../components/layout/Navbar";

import "./globals.css";

import LoaderProvider from "./LoaderProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* SEO — website title and description */
export const metadata = {
  title: "Narayanam | Premium Women's Ethnic Wear",

  description:
    "Explore premium women's ethnic wear at Narayanam. Shop stylish sarees, suits, kurtis, blouses and traditional fashion collections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <LoaderProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </LoaderProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
