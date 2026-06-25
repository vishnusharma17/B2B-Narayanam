import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const response = await resend.emails.send({
      from: "Narayanam <onboarding@resend.dev>",
      to,
      subject,
      text,
    });

    console.log("EMAIL SENT:", response);

    return response;
  } catch (error) {
    console.log("RESEND ERROR:", error);

    throw error;
  }
};
