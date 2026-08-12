import React, { useState } from 'react';
import { Phone, Menu, X, ArrowUpRight, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ onOpenQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Estudio', href: '#estudio' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Procesos', href: '#procesos' },
    { name: 'Visualización', href: '#visualizacion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
            <img 
              src="/assets/images/logo.png" 
              alt="JUVE 3D STUDIO Logo" 
              className="w-full h-full object-contain filter invert contrast-200 brightness-200"
              onError={(e) => {
                // Fallback to geometric Box icon if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Box className="w-6 h-6 text-white hidden" />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-0.5">
              JUVE<span className="text-zinc-400">3D</span>STUDIO<span className="text-xs text-zinc-500 ml-0.5">®</span>
            </span>
          </div>
        </a>

        {/* Center: Floating Glass Pill Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-4 py-2 rounded-full border border-zinc-800/80 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Phone & CTA Button */}
        <div className="hidden lg:flex items-center gap-5">
          <a 
            href="tel:88005554747" 
            className="flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>8 800 555-47-47</span>
          </a>

          <button
            onClick={onOpenQuoteModal}
            className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 flex items-center gap-1.5 active:scale-95"
          >
            <span>SOLICITAR COTIZACIÓN</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-6 glass-panel rounded-2xl border border-zinc-800 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-zinc-200 hover:text-white border-b border-zinc-800/50"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-2 flex flex-col gap-3">
              <a 
                href="tel:88005554747" 
                className="flex items-center gap-2 text-sm text-zinc-400 py-1"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>8 800 555-47-47</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <span>SOLICITAR COTIZACIÓN</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
