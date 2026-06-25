import bcrypt from "bcryptjs";

import crypto from "crypto";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { sendEmail } from "../utils/sendEmail.js";

import { OAuth2Client } from "google-auth-library";

// =========================
// GOOGLE CLIENT
// =========================

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// =========================
// GOOGLE LOGIN
// =========================

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential missing",
      });
    }

    // VERIFY TOKEN
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    // CHECK USER
    let user = await User.findOne({
      email,
    });

    // CREATE USER
    if (!user) {
      const hashedPassword = await bcrypt.hash("google-login-user", 10);

      user = await User.create({
        name,
        email,
        image: picture,
        password: hashedPassword,
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Google login failed",
    });
  }
};

// =========================
// REGISTER
// =========================

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, address } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // PASSWORD MATCH
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// LOGIN
// =========================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// FORGOT PASSWORD
// =========================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // GENERATE TOKEN
    console.log("User Found");

    const resetToken = crypto.randomBytes(32).toString("hex");

    console.log("Token Generated");

    await user.save();

    console.log("User Saved");

    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset - Narayanam",
      text: `
Hello ${user.name},

Click below link to reset your password:

${resetUrl}

This link expires in 15 minutes.

Thank you,
Narayanam Team
        `,
    });

    res.json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// RESET PASSWORD
// =========================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    // VALIDATION
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE PROFILE
// =========================

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // VALIDATION
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    // UPDATE USER
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
        address,
      },
      {
        new: true,
      },
    );

    // RESPONSE
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Profile update failed",
    });
  }
};
