import { Suspense } from "react";
import Hero_section from "../components/website/home/HeroSection";
import AboutComponent from "../components/website/home/AboutComponent";
import ValueSection from "../components/website/home/ValueSection";
import ContactUS from "../components/website/home/ContanctUS";
import { 
  ServicesWrapper, 
  PortfolioWrapper, 
  BlogWrapper 
} from "../components/website/home/HomeWrappers";
import { 
  SectionSkeleton, 
  PortfolioSkeleton, 
  BlogSkeleton 
} from "../components/website/home/HomeSkeletons";

export default async function Home() {
  return (
    <>
      <Hero_section />
      <AboutComponent />
      <ValueSection />
      
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesWrapper />
      </Suspense>

      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioWrapper />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogWrapper />
      </Suspense>

      <ContactUS />
    </>
  );
}
