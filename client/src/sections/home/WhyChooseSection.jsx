import {
  Crown,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      title: "500+ Premium Designs",
      desc: "Curated ethnic collections crafted for modern fashion retailers.",
      icon: Crown,
    },

    {
      title: "Low MOQ",
      desc: "Flexible wholesale ordering suitable for boutiques & resellers.",
      icon: PackageCheck,
    },

    {
      title: "Fast Delivery",
      desc: "Quick dispatch and reliable shipping across India.",
      icon: Truck,
    },

    {
      title: "Premium Quality",
      desc: "Luxury fabrics, detailed craftsmanship and export-grade finishing.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f8f3ec]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">

          <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#b68d40] text-[10px] sm:text-xs mb-2">
            Why Choose Narayanam
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
            Trusted By Fashion
            <br className="hidden sm:block" />
            Retailers Across India
          </h2>

          <p className="text-gray-600 mt-4 sm:mt-5 max-w-2xl mx-auto leading-6 sm:leading-8 text-xs sm:text-sm lg:text-base px-2">
            We help boutiques, wholesalers and fashion retailers
            source premium ethnic collections with unmatched quality,
            flexible ordering and fast delivery.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  group
                  bg-white
                  rounded-2xl
                  p-4
                  sm:p-6
                  lg:p-8
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  border
                  border-transparent
                  hover:border-[#d6b36a]
                "
              >

                {/* Icon */}
                <div
                  className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
                    lg:w-16
                    lg:h-16
                    rounded-2xl
                    bg-[#f8f3ec]
                    flex
                    items-center
                    justify-center
                    mb-4
                    sm:mb-5
                    group-hover:bg-black
                    transition
                    duration-300
                  "
                >
                  <Icon
                    size={24}
                    className="
                      text-black
                      group-hover:text-white
                      transition
                      duration-300
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-xl font-medium mb-2 sm:mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-5 sm:leading-7 text-[11px] sm:text-sm">
                  {item.desc}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}