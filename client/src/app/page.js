import CategorySection from "../sections/home/CategorySection";
import CTASection from "../sections/home/CTASection";
import HeroSection from "../sections/home/HeroSection";
import MostViewedSection from "../sections/home/MostViewedSection";
import TestimonialSection from "../sections/home/TestimonialSection";
import TrendingSection from "../sections/home/TrendingSection";
import WhyChooseSection from "../sections/home/WhyChooseSection";
// NEW SECTIONS
import BestSellerSection from "../sections/home/BestSellerSection";
import LimitedStockSection from "../sections/home/LimitedStockSection";
export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <HeroSection />

      {/* <ShopByRoleSection /> */}
      {/* New Arrivals */}
      <CategorySection />
      <TrendingSection />
      <WhyChooseSection />
      <BestSellerSection />
      <LimitedStockSection />
      {/* <ProductSection /> */}

      {/* Trending Products */}

      {/* Shop By Category */}

      {/* Best Sellers */}

      {/* Most Viewed */}
      <MostViewedSection />

      {/* <FashionStoriesSection /> */}
      {/* <WardrobePickSection /> */}
      {/* Why Choose Us */}

      {/* Limited Stock / FOMO */}

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Banner */}
      <CTASection />

      {/* Newsletter */}
      {/* <NewsletterSection /> */}
    </>
  );
}
