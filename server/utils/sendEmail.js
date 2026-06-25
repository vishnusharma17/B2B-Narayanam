import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  console.log("EMAIL USER =", process.env.EMAIL_USER);
  console.log("EMAIL PASS =", process.env.EMAIL_PASS ? "YES" : "NO");
  console.log("TO =", to);
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.verify();

    console.log("SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"Narayanam" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("MESSAGE ID:", info.messageId);
    console.log("EMAIL SENT:", info.response);

    return info;
  } catch (error) {
    console.log("FULL EMAIL ERROR:", error);
    throw error;
  }
};
