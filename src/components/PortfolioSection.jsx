import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, X, Check, ExternalLink } from 'lucide-react';

export function PortfolioSection({ onOpenQuoteModal }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['Todos', 'Residencial', 'Comercial', 'Renders'];

  const projects = [
    {
      id: 'casa-solail',
      name: 'CASA SOLAIL',
      area: '110 m²',
      category: 'Residencial',
      image: '/assets/projects/casa-solail.png',
      desc: 'Vivienda unifamiliar sustentable en madera quemada y cristal con integración de paisaje forestal.',
      details: {
        location: 'Valle de Bravo, México',
        year: '2025',
        type: 'Modelado 3D + Renders Exteriores',
        software: 'Revit 3D + Lumion 2024'
      }
    },
    {
      id: 'estudio-del-lago',
      name: 'ESTUDIO DEL LAGO',
      area: '180 m²',
      category: 'Comercial',
      image: '/assets/projects/estudio-del-lago.png',
      desc: 'Estudio de arquitectura y pabellón sobre cuerpo de agua con acabados en concreto aparente y acero.',
      details: {
        location: 'Monterrey, NL',
        year: '2025',
        type: 'Proyecto Arquitectónico Completo',
        software: 'Rhino + V-Ray 6'
      }
    },
    {
      id: 'torre-azur',
      name: 'TORRE AZUR',
      area: '4,200 m²',
      category: 'Renders',
      image: '/assets/projects/torre-azur.png',
      desc: 'Torre corporativa y de usos mixtos con fachada dinámica fotovoltaica y vistas panorámicas.',
      details: {
        location: 'San Pedro Garza García, NL',
        year: '2026',
        type: 'Renders Hiperrealistas + VR 360°',
        software: '3ds Max + Unreal Engine 5'
      }
    },
    {
      id: 'residencia-vista',
      name: 'RESIDENCIA VISTA',
      area: '320 m²',
      category: 'Residencial',
      image: '/assets/images/hero-villa.png',
      desc: 'Villa contemporánea de dos niveles integrada en ladera de montaña con alberca en cantiléver.',
      details: {
        location: 'Santiago, NL',
        year: '2025',
        type: 'Visualización y Recorrido Virtual',
        software: 'Blender + D5 Render'
      }
    }
  ];

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            CATÁLOGO DE OBRAS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Proyectos Listos
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 glass-pill p-1.5 rounded-full self-start md:self-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Cards with Depth Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer relative"
            onClick={() => setActiveModalProject(project)}
          >
            {/* Stacked Depth Shadow Layers mimicking design mockup */}
            <div className="absolute inset-0 bg-zinc-800/40 rounded-3xl translate-y-3 translate-x-2 border border-zinc-700/30 -z-10 group-hover:translate-y-4 group-hover:translate-x-3 transition-transform duration-300" />
            <div className="absolute inset-0 bg-zinc-900/60 rounded-3xl translate-y-1.5 translate-x-1 border border-zinc-800/40 -z-10" />

            {/* Main Project Card */}
            <div className="glass-panel p-4 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col justify-between h-full bg-[#18181B]">
              
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-zinc-900">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-zinc-800">
                  {project.category}
                </div>

                {/* View Details Hover Icon */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 group-hover:scale-100">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="flex items-center justify-between px-2 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-zinc-200 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {project.area}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/70 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Project Details */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Large Render Preview */}
                <div className="lg:col-span-7 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img 
                    src={activeModalProject.image} 
                    alt={activeModalProject.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Details */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-300 mb-3 border border-zinc-700">
                      {activeModalProject.category} • {activeModalProject.area}
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">
                      {activeModalProject.name}
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                      {activeModalProject.desc}
                    </p>

                    <div className="space-y-3 border-t border-b border-zinc-800 py-4 mb-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 font-mono">Ubicación:</span>
                        <span className="text-zinc-200 font-medium">{activeModalProject.details.location}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 font-mono">Año:</span>
                        <span className="text-zinc-200 font-medium">{activeModalProject.details.year}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 font-mono">Entregable:</span>
                        <span className="text-zinc-200 font-medium">{activeModalProject.details.type}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 font-mono">Software:</span>
                        <span className="text-zinc-200 font-medium">{activeModalProject.details.software}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModalProject(null);
                      onOpenQuoteModal();
                    }}
                    className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Cotizar Proyecto Similar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
