export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">
            Narayanam
          </p>

          <h1 className="text-4xl md:text-6xl font-light mt-4">
            Privacy Policy
          </h1>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          <p className="text-gray-500 mt-5">
            Your privacy and data security matter to us.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-8">
              We collect information including name, email, phone number,
              shipping address and billing details to process orders and
              improve customer experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Data
            </h2>
            <p className="text-gray-600 leading-8">
              Information is used for order fulfillment, customer support,
              marketing communication and website improvements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Data Protection
            </h2>
            <p className="text-gray-600 leading-8">
              We maintain appropriate security measures to protect your data
              from unauthorized access or disclosure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}