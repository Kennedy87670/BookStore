import { useTitle } from "../../hooks/useTitle";
import { Faq } from "./component/Faq";
import { FeaturedProduct } from "./component/FeaturedProduct";
import { HeroSection } from "./component/HeroSection";
import { Testimonials } from "./component/Testimonials";

export const HomePage = () => {
  useTitle("Access Latest Computer Science ebooks");
  return (
    <main>
      <HeroSection />
      <FeaturedProduct />
      <Testimonials />
      <Faq />
    </main>
  );
};
