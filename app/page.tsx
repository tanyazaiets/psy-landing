import Hero from "@/components/Hero";
import ForWhom from "@/components/ForWhom";
import WhyThisGuide from "@/components/WhyThisGuide";
import ContentAndResults from "@/components/ContentAndResults";
import AboutAuthor from "@/components/AboutAuthor";
import PricingAndUpsell from "@/components/PricingAndUpsell";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <Hero />
        <ForWhom />
        <WhyThisGuide />
        <ContentAndResults />
        <AboutAuthor />
        <PricingAndUpsell />
      </div>
      <Footer />
    </main>
  );
}