export default function PolicyPage({
  title ="Policy Page",
  subtitle = "",
  sections = [],
}) {
  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-[#D4AF37] text-xs sm:text-sm font-medium">
            Narayanam
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mt-4">
            {title}
          </h1>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          <p className="text-gray-500 mt-5 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {sections?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/10 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h2>

              <div className="text-gray-600 leading-7 whitespace-pre-line">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}