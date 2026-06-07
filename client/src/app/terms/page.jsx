export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-[#D4AF37] text-sm">
            Narayanam
          </p>

          <h1 className="text-4xl md:text-6xl font-light mt-4">
            Terms & Conditions
          </h1>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          <p className="text-gray-500 mt-5">
            Terms governing the use of our website and services.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Website Usage
            </h2>
            <p className="text-gray-600 leading-8">
              By accessing this website, you agree to comply with all
              applicable laws and regulations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Product Availability
            </h2>
            <p className="text-gray-600 leading-8">
              Product availability may change without notice. We reserve the
              right to modify or discontinue products.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-8">
              All content, logos, product images and designs belong to
              Narayanam and cannot be reused without permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}