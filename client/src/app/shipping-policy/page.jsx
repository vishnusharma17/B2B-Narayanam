export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">
            Narayanam
          </p>

          <h1 className="text-4xl md:text-6xl font-light mt-4">
            Shipping Policy
          </h1>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          <p className="text-gray-500 mt-5">
            Shipping and delivery information for our customers.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Order Processing
            </h2>
            <p className="text-gray-600 leading-8">
              Orders are processed within 1-3 business days after successful
              payment confirmation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Delivery Timeline
            </h2>
            <p className="text-gray-600 leading-8">
              Standard delivery across India generally takes 5-10 business
              days depending on the location.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Tracking Orders
            </h2>
            <p className="text-gray-600 leading-8">
              Customers receive tracking details via email or phone once the
              order has been dispatched.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}