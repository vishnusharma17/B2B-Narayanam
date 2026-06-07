import PolicyPage from "@/components/PolicyPage";

export default function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="Your privacy and data protection are important to us."
      sections={[
        {
          title: "Information We Collect",
          content:
            "We may collect personal information such as your name, email address, phone number, billing address, shipping address and payment details when you place an order or contact us.",
        },
        {
          title: "How We Use Information",
          content:
            "Your information is used to process orders, provide customer support, improve our services, send order updates and communicate important information related to your purchases.",
        },
        {
          title: "Data Security",
          content:
            "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration or disclosure.",
        },
        {
          title: "Third-Party Services",
          content:
            "We may use trusted third-party services for payment processing, analytics and shipping. These providers only receive information necessary to perform their services.",
        },
        {
          title: "Contact Us",
          content:
            "If you have any questions regarding this Privacy Policy, please contact us through our website contact page.",
        },
      ]}
    />
  );
}