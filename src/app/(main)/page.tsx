import { CategoriesSection } from "@/components/home/categories-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { RoleJourney } from "@/components/home/role-journey";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <CategoriesSection />
      <HowItWorks />
      <RoleJourney />
      <CtaSection />
    </>
  );
}
