import PolicyPage from "@/components/PolicyPage";

export default function ShippingPolicy() {
  const sections = [
    {
      title: "Order Processing",
      content: `
Orders are generally processed within 1–3 business days after payment confirmation.
      `,
    },
    {
      title: "Delivery Timeline",
      content: `
Domestic deliveries typically take 3–7 business days.

Remote locations may require additional time.
      `,
    },
    {
      title: "Tracking Information",
      content: `
Customers receive tracking details via email or SMS once the order is dispatched.
      `,
    },
    {
      title: "Delays",
      content: `
Delays due to weather, public holidays or logistics disruptions may occur.
      `,
    },
    {
      title: "Damaged Shipments",
      content: `
Customers should report damaged packages within 48 hours of delivery.
      `,
    },
  ];

  return (
    <PolicyPage
      title="Shipping Policy"
      subtitle="Last Updated: June 2026"
      sections={sections}
    />
  );
}