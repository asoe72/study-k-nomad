import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LiveTicker from "@/components/sections/LiveTicker";
import TopCitiesSection from "@/components/sections/TopCitiesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveFeedSection from "@/components/sections/LiveFeedSection";
import MapTeaserSection from "@/components/sections/MapTeaserSection";
import CityFinderSection from "@/components/sections/CityFinderSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <main>
        {/* 01 Hero */}
        <HeroSection />
        {/* 02 Live Ticker */}
        <LiveTicker />
        {/* 03 Top Cities */}
        <TopCitiesSection />
        {/* 04 How It Works */}
        <HowItWorksSection />
        {/* 05 Live Feed */}
        <LiveFeedSection />
        {/* 06 ASCII Map */}
        <MapTeaserSection />
        {/* 07 City Finder */}
        <CityFinderSection />
      </main>
      <Footer />
    </div>
  );
}
