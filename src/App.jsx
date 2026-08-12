import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Modelado 3D');

  const handleOpenQuoteModal = (service = 'Modelado 3D') => {
    setSelectedService(service);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#F4F4F5] font-sans relative selection:bg-zinc-700 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal('Modelado 3D')} />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section (Clean design with background villa render & 4 quick cards) */}
        <Hero 
          onOpenQuoteModal={() => handleOpenQuoteModal('Modelado 3D')} 
          onSelectService={(serviceTitle) => handleOpenQuoteModal(serviceTitle)}
        />

        {/* 2. About Section with Juve portrait & interior render */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal('Proyecto Integral')} />

        {/* 3. Portfolio / Projects Grid with Depth-Tilt Effect */}
        <PortfolioSection onOpenQuoteModal={() => handleOpenQuoteModal('Renderizado')} />

        {/* 4. Flujo de Proceso con Experiencia 3D Pinned (GSAP ScrollTrigger + Blueprint Diagrams) */}
        <ProcessSection />

        {/* 5. Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Quotation Calculator Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialService={selectedService}
      />
    </div>
  );
}
