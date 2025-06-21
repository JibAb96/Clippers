import React from "react";
import { Maven_Pro } from "next/font/google";
import HeroSection from "./components/landing/HeroSection";
import ValuePropositions from "./components/landing/ValuePropositions";
import ServicesOverview from "./components/landing/ServicesOverview";
import Testimonials from "./components/landing/Testimonials";
import AboutSection from "./components/landing/AboutSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import CTASection from "./components/landing/CTASection";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-maven_pro",
});

const Home = () => {
  return (
    <main
      className={`${mavenPro.variable} font-sans bg-primary overflow-hidden`}
    >
      {/* Background Animation */}
      <div className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ValuePropositions />
        <ServicesOverview />
        <FeaturesSection />
        <Testimonials />
        <AboutSection />
        <CTASection />
      </div>
    </main>
  );
};

export default Home;
