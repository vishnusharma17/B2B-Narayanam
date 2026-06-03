import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";

// Load environment variables
dotenv.config();

import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Routes
import aboutRoutes from "./routes/aboutRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import contactSettingsRoutes from "./routes/contactSettingsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import fashionStoryRoutes from "./routes/fashionStoryRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import shopRoleRoutes from "./routes/shopRoleRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import wardrobePickRoutes from "./routes/wardrobePickRoutes.js";
import wholesaleRoutes from "./routes/wholesaleRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

// Connect DB
connectDB();

const app = express();

// ---------------- MIDDLEWARES ---------------- //

// CORS FIX
app.use(
  cors({
    origin: ["http://localhost:3000", "https://narayanam-store.vercel.app"],
    credentials: true,
  }),
);

// JSON parser
app.use(express.json());

// Static uploads
app.use("/uploads", express.static("uploads"));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// app.use(limiter);

// ---------------- API ROUTES ---------------- //

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/banners", bannerRoutes);

app.use("/api/enquiry", enquiryRoutes);

app.use("/api/contact-settings", contactSettingsRoutes);

app.use("/api/wholesale-settings", wholesaleRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/testimonials", testimonialRoutes);

app.use("/api/footer-settings", footerRoutes);

app.use("/api/about-settings", aboutRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/products", productRoutes);

app.use("/api/fashion-stories", fashionStoryRoutes);

app.use("/api/shop-roles", shopRoleRoutes);

app.use("/api/wardrobe-picks", wardrobePickRoutes);

app.use("/api/address", addressRoutes);

// ---------------- TEST ROUTE ---------------- //

app.get("/", (req, res) => {
  res.send("B2B Server Running 🚀");
});

// ---------------- ERROR HANDLER ---------------- //

app.use(errorHandler);

// ---------------- SERVER ---------------- //

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
