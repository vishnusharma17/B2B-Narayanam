export default function WhyChooseSection() {
  const features = [
    "500+ Designs",
    "Low MOQ",
    "Fast Delivery",
    "Premium Quality"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-10">

        <h2 className="text-5xl text-center mb-14">
          Why Retailers Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-8 bg-[#F9F6F1] rounded-2xl text-center shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}