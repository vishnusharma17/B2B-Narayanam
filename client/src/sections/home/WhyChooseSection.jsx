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
    <section className="py-24 sm:py-28 bg-[#f8f3ec]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          
          <p className="uppercase tracking-[4px] text-[#b68d40] text-sm mb-4">
            Why Choose Narayanam
          </p>

          <h2 className="text-3xl sm:text-5xl font-light leading-tight">
            Trusted By Fashion
            <br />
            Retailers Across India
          </h2>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto leading-8 text-sm sm:text-base">
            We help boutiques, wholesalers and fashion retailers
            source premium ethnic collections with unmatched quality,
            flexible ordering and fast delivery.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  group
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  border
                  border-transparent
                  hover:border-[#d6b36a]
                "
              >
                
                {/* Icon */}
                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#f8f3ec]
                  flex
                  items-center
                  justify-center
                  mb-6
                  group-hover:bg-black
                  transition
                  duration-500
                ">
                  <Icon
                    size={30}
                    className="
                      text-black
                      group-hover:text-white
                      transition
                      duration-500
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7 text-sm">
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