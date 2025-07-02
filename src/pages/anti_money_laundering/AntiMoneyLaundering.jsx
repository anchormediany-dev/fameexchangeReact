import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import amlData from "../../data/amlData";

import AMLHero from "../../components/AML/AMLHero";
import AMLSectionCard from "../../components/AML/AMLSectionCard";
import AMLMobileAccordion from "../../components/AML/AMLMobileAccordion";
import AMLBackground from "../../components/AML/AMLBackground";

const AntiMoneyLaundering = () => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (id) => {
    if (expandedSections.includes(id)) {
      setExpandedSections(expandedSections.filter((i) => i !== id));
    } else {
      setExpandedSections([...expandedSections, id]);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white relative overflow-x-hidden">
      <AMLBackground />
      <Navbar />
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <AMLHero />

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {amlData.map((section, index) => (
            <AMLMobileAccordion
              key={section.id}
              section={section}
              isExpanded={expandedSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
              delay={0.3 + index * 0.05}
            />
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 gap-8">
          {amlData.map((section, index) => (
            <AMLSectionCard
              key={section.id}
              section={section}
              delay={0.3 + index * 0.05}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AntiMoneyLaundering;
