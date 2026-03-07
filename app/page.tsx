import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LiveTicker from "@/components/sections/LiveTicker";
import TopCitiesSection from "@/components/sections/TopCitiesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveFeedSection from "@/components/sections/LiveFeedSection";
import MapTeaserSection from "@/components/sections/MapTeaserSection";
import CityFinderSection from "@/components/sections/CityFinderSection";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let navUser: { email: string; username?: string } | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();
    navUser = { email: user.email ?? "", username: profile?.username };
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar user={navUser} />
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
