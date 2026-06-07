import PolicyPage from "@/components/PolicyPage";

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `
By accessing and using Narayanam website, you agree to comply with these terms and conditions.
      `,
    },
    {
      title: "Products & Pricing",
      content: `
All products are subject to availability. Prices may change without prior notice.
      `,
    },
    {
      title: "Orders",
      content: `
Narayanam reserves the right to refuse or cancel orders for any reason including stock limitations.
      `,
    },
    {
      title: "Payments",
      content: `
All payments are processed through secure payment gateways.
      `,
    },
    {
      title: "Intellectual Property",
      content: `
All website content, designs, logos and images belong to Narayanam.
      `,
    },
  ];

  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Last Updated: June 2026"
      sections={sections}
    />
  );
}