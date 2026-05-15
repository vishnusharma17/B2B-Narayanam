import CategorySection from "../sections/home/CategorySection";
import CTASection from "../sections/home/CTASection";
import HeroSection from "../sections/home/HeroSection";
import ProductSection from "../sections/home/ProductSection";
import TestimonialSection from "../sections/home/TestimonialSection";
import TrendingSection from "../sections/home/TrendingSection";
import WhyChooseSection from "../sections/home/WhyChooseSection";
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <TrendingSection />
      <CategorySection />
      <WhyChooseSection />
      <CTASection />
      <TestimonialSection />
    </>
  );
}
