import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6 md:px-10 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-black text-white p-10 md:p-14 flex flex-col justify-center">
          <p className="text-[#C9A227] uppercase tracking-[6px] text-sm">
            Narayanam
          </p>

          <h1 className="text-4xl md:text-5xl font-light mt-5 leading-tight">
            Order Successfully Placed
          </h1>

          <div className="w-20 h-[2px] bg-[#C9A227] mt-6"></div>

          <p className="mt-8 text-gray-300 leading-8">
            Thank you for shopping with Narayanam. Your payment has been
            successfully completed and our team will contact you shortly
            regarding your luxury order.
          </p>

          <div className="mt-10 bg-white/10 p-5 rounded-2xl">
            <p className="text-sm text-gray-300">Estimated Processing Time</p>

            <p className="text-2xl font-semibold mt-2">24 - 48 Hours</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-14 flex flex-col justify-center items-center text-center">
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-8">
            ✅
          </div>

          <h2 className="text-3xl font-semibold">Payment Confirmed</h2>

          <p className="text-gray-600 mt-5 leading-8">
            Your order has been received successfully. You can continue
            exploring our premium collections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full">
            <Link href="/products" className="w-full">
              <button className="w-full bg-black hover:bg-[#7A1E1E] text-white py-4 rounded-full transition">
                Continue Shopping
              </button>
            </Link>

            <Link href="/" className="w-full">
              <button className="w-full border border-black py-4 rounded-full hover:bg-black hover:text-white transition">
                Back Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
