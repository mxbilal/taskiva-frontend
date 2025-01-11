"use client";

import React from 'react';
import HeroSection from './components/HeroSection';
import WhyUsSection from './components/WhyUsSection';
import HowItWorksSection from './components/HowItWorksSection';
import TeamShowcaseSection from './components/TeamShowcaseSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <WhyUsSection />
      <HowItWorksSection />
      <TeamShowcaseSection />
      <Footer />
    </main>
  );
}