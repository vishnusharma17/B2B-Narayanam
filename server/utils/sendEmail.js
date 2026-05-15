import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    console.log("EMAIL USER:", process.env.EMAIL_USER);

    console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.log("FULL EMAIL ERROR:", error);
  }
};
