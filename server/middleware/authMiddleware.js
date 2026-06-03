import jwt from "jsonwebtoken";
import User from "../models/User.js";

// LOGIN CHECK
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER =>", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("TOKEN =>", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED =>", decoded);

    const user = await User.findById(decoded.id).select("-password");

    console.log("USER =>", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("JWT ERROR =>", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

// ADMIN CHECK
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin only",
    });
  }
};
