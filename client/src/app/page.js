import CategorySection from "../sections/home/CategorySection";
import CTASection from "../sections/home/CTASection";
import HeroSection from "../sections/home/HeroSection";
import MostViewedSection from "../sections/home/MostViewedSection";
import ProductSection from "../sections/home/ProductSection";
import TestimonialSection from "../sections/home/TestimonialSection";
import TrendingSection from "../sections/home/TrendingSection";
import WhyChooseSection from "../sections/home/WhyChooseSection";
// NEW SECTIONS
import BestSellerSection from "../sections/home/BestSellerSection";
import FashionStoriesSection from "../sections/home/FashionStoriesSection";
import LimitedStockSection from "../sections/home/LimitedStockSection";
import NewsletterSection from "../sections/home/NewsletterSection";
import ShopByRoleSection from "../sections/home/ShopByRoleSection";
import WardrobePickSection from "../sections/home/WardrobePickSection";
export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <HeroSection />

      <ShopByRoleSection />
      {/* New Arrivals */}
      <ProductSection />

      {/* Trending Products */}
      <TrendingSection />

      {/* Shop By Category */}
      <CategorySection />

      {/* Best Sellers */}
      <BestSellerSection />

      {/* Most Viewed */}
      <MostViewedSection />

      <FashionStoriesSection />
      <WardrobePickSection />
      {/* Why Choose Us */}

      <WhyChooseSection />

      {/* Limited Stock / FOMO */}
      <LimitedStockSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Banner */}
      <CTASection />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
