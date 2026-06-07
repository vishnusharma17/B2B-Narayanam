import PolicyPage from "@/components/PolicyPage";

export default function Page() {
  return (
   <PolicyPage
  title="Shipping Policy"
  subtitle="Information regarding delivery, dispatch and shipping."
  sections={[
    {
      title: "Order Processing",
      content: "Orders are processed within 1-3 business days.",
    },
    {
      title: "Shipping Timeline",
      content: "Delivery takes 5-10 business days.",
    },
  ]}
/>
  );
}