import PolicyPage from "@/components/PolicyPage";
export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: `
• Name
• Email Address
• Phone Number
• Shipping Address
• Order History
• Payment Information
      `,
    },
    {
      title: "How We Use Information",
      content: `
We use customer information to process orders, improve services, provide support, send updates and maintain account security.
      `,
    },
    {
      title: "Data Security",
      content: `
We implement industry-standard security measures to protect customer information from unauthorized access.
      `,
    },
    {
      title: "Third Party Services",
      content: `
We may share information with trusted logistics, payment gateways and service providers solely for business operations.
      `,
    },
    {
      title: "Your Rights",
      content: `
Customers may request access, correction or deletion of their personal information at any time.
      `,
    },
  ];

  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="Last Updated: June 2026"
      sections={sections}
    />
  );
}