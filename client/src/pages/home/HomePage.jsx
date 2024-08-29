import { Faq } from "./component/Faq";
import { FeaturedProduct } from "./component/FeaturedProduct";
import { HeroSection } from "./component/HeroSection";
import { Testimonials } from "./component/Testimonials";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProduct />
      <Testimonials />
      <Faq />
    </main>
  );
};
