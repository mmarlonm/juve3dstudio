import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Box, Layers, Compass, ArrowRight } from 'lucide-react';

export function Hero({ onOpenQuoteModal, onSelectService }) {
  const quickCards = [
    {
      id: 'diseno-arquitectonico',
      title: 'Diseño Arquitectónico',
      desc: 'Proyectos ejecutivos residenciales y comerciales desde Saltillo, Coahuila.',
      icon: Sparkles,
    },
    {
      id: 'presupuestos-reales',
      title: 'Presupuestos Reales',
      desc: 'Análisis honesto y transparente de costos de construcción y materiales.',
      icon: Box,
    },
    {
      id: 'cimentacion-obra',
      title: 'Cimentación & Obra',
      desc: 'Supervisión didáctica de zapatas aisladas, contratrabes y estructuración.',
      icon: Layers,
    },
    {
      id: 'modelado-3d-vr',
      title: 'Modelado 3D & VR',
      desc: 'Renders hiperrealistas y recorridos inmersivos de máxima precisión.',
      icon: Compass,
    },
  ];


  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-between overflow-hidden bg-grid-pattern">
      
      {/* Background Architectural House Render Backdrop */}
      <div className="absolute inset-x-4 top-20 bottom-10 rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl z-0">
        <img 
          src="/assets/images/hero-villa.png" 
          alt="Modern Architectural Villa JUVE3DStudio" 
          className="w-full h-full object-cover object-center opacity-65 filter brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/60 to-[#0F0F10]/20" />
      </div>


      {/* Main Hero Headline & Subtitle */}
      <div className="relative z-20 max-w-4xl mx-auto md:mx-0 md:ml-8 mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/70 border border-zinc-700/60 text-xs font-mono text-zinc-300 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            EL ARQUI JUVE • JUVE 3D STUDIO • SALTILLO, COAHUILA
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gradient-silver uppercase leading-[1.05] mb-6">
            ARQUITECTURA VISUAL<br />
            Y MODELADO 3D DE<br />
            ALTA PRECISIÓN.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed mb-8">
            Transformamos planos conceptuales en modelos tridimensionales hiperrealistas, presupuestos transparentes y recorridos interactivos de máxima precisión liderados por Diego Alvarado (El Arqui Juve).
          </p>
        </motion.div>
      </div>


      {/* 4 Floating Quick Access Cards at Bottom of Hero */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
        {quickCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onClick={() => onSelectService(card.title)}
              className="group cursor-pointer glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between min-h-[160px]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-zinc-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1 tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
