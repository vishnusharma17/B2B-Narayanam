import dynamic from "next/dynamic";

import CategorySection from "../sections/home/CategorySection";
import HeroSection from "../sections/home/HeroSection";

// Lazy Loaded Sections
const TrendingSection = dynamic(() =>
  import("../sections/home/TrendingSection")
);

const WhyChooseSection = dynamic(() =>
  import("../sections/home/WhyChooseSection")
);

const BestSellerSection = dynamic(() =>
  import("../sections/home/BestSellerSection")
);

const LimitedStockSection = dynamic(() =>
  import("../sections/home/LimitedStockSection")
);

const MostViewedSection = dynamic(() =>
  import("../sections/home/MostViewedSection")
);

const TestimonialSection = dynamic(() =>
  import("../sections/home/TestimonialSection")
);

const CTASection = dynamic(() => import("../sections/home/CTASection"));

export default function Home() {
  return (
    <>
      {/* Above The Fold */}
      <HeroSection />
      <CategorySection />

      {/* Lazy Loaded */}
      <TrendingSection />
      <WhyChooseSection />
      <BestSellerSection />
      <LimitedStockSection />
      <MostViewedSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
