import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 LOGIN CHECK
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👉 IMPORTANT: DB se user fetch karo (role ke liye)
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// 👑 ADMIN CHECK
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};
