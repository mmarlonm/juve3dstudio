import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalScene } from './3d/ArchitecturalScene';
import { Layers, Cpu, Box, Sparkles, ArrowDown, CheckCircle2, ChevronRight } from 'lucide-react';
import { getAssetPath } from '../utils/assets';


gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // GSAP ScrollTrigger pinned context for 100% viewport height screen pinning
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute active step index (0 to 7) based on scroll progress
  const rawStepIndex = Math.floor(scrollProgress * 8);
  const currentStep = Math.max(0, Math.min(7, rawStepIndex));

  // Exact 8-step sequence using diagrams 2.jpg through 9.jpg in exact order
  const steps = [
    {
      num: '01',
      tag: '01. Elementos Básicos',
      title: 'Elementos Básicos de Estructura',
      desc: 'Reconocimiento de componentes: Plantilla base, Zapata aislada, Pedestal y Columna vertical.',
      diagram: '/assets/diagrams/2.jpg',
      icon: Layers,
    },
    {
      num: '02',
      tag: '02. Las Zapatas',
      title: '¿Qué son las Zapatas Aisladas?',
      desc: 'Cimentación superficial diseñada para recibir cargas puntuales de columnas y distribuirlas al suelo.',
      diagram: '/assets/diagrams/3.jpg',
      icon: Cpu,
    },
    {
      num: '03',
      tag: '03. Pedestales',
      title: '¿Y los Pedestales?',
      desc: 'Soportes inferiores más anchos que sostienen la columna para dar estabilidad y rigidez estructural.',
      diagram: '/assets/diagrams/4.jpg',
      icon: Box,
    },
    {
      num: '04',
      tag: '04. Trabe de Liga',
      title: 'Trabe de Liga o Contratrabe',
      desc: 'Viga de cinturón inferior encargada de amarrar los pedestales por abajo en toda la estructura.',
      diagram: '/assets/diagrams/5.jpg',
      icon: Sparkles,
    },
    {
      num: '05',
      tag: '05. Columnas',
      title: 'Levantamiento de Columnas',
      desc: 'Transmisión directa del peso de la cubierta hacia la cimentación de zapatas.',
      diagram: '/assets/diagrams/6.jpg',
      icon: Layers,
    },
    {
      num: '06',
      tag: '06. Vigas Superiores',
      title: 'Amarre de Vigas Superiores',
      desc: 'Anillo de vigas superiores para transmitir el peso de la cubierta uniformemente a las columnas.',
      diagram: '/assets/diagrams/7.jpg',
      icon: Cpu,
    },
    {
      num: '07',
      tag: '07. Esqueleto Final',
      title: 'Estructura Completa Armada',
      desc: 'Integración tridimensional terminada de cimentación, columnas y marco de vigas en zapatas aisladas.',
      diagram: '/assets/diagrams/8.jpg',
      icon: Box,
    },
    {
      num: '08',
      tag: '08. Muros & Block',
      title: 'Muros de Recubrimiento',
      desc: 'Los muros de block no cumplen función estructural de carga, solo fungiendo como envolvente y recubrimiento.',
      diagram: '/assets/diagrams/9.jpg',
      icon: Sparkles,
    },
  ];

  return (
    <section id="procesos" ref={containerRef} className="relative bg-[#0F0F10] overflow-hidden">
      {/* Fullscreen Pinned Experience Container (Fija cuando la sección ocupa 100% la pantalla) */}
      <div 
        ref={triggerRef} 
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-10 bg-grid-pattern"
      >
        
        {/* Background 3D WebGL Canvas */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Canvas
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', precision: 'mediump' }}
            className="w-full h-full"
          >
            <PerspectiveCamera makeDefault position={[0, 0.6, 9.2]} fov={42} />
            <ArchitecturalScene scrollProgress={scrollProgress} />
          </Canvas>
        </div>


        {/* Top Navigation Bar Overlay */}
        <div className="relative z-10 pointer-events-none flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-xs font-mono text-zinc-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
            <span className="truncate">METODOLOGÍA ARCH-3D • INGENIERÍA Y CONSTRUCCIÓN</span>
          </div>

          {/* Progress Bar Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-800 shadow-xl">
            <span className="text-xs font-mono text-zinc-400">PASO {currentStep + 1} DE 8</span>
            <div className="w-24 sm:w-36 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-150" 
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Responsive Content Grid */}
        <div className="relative z-10 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center my-auto w-full">
          
          {/* Left: Active Step Title & Description */}
          <div className="lg:col-span-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === idx;
              return (
                <div 
                  key={step.num}
                  className={`transition-all duration-500 ${
                    isActive 
                      ? 'opacity-100 translate-y-0 relative' 
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300 mb-2 sm:mb-3">
                    <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>PASO {step.num} • {step.tag}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3 leading-tight">
                    {step.title}
                  </h2>

                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed bg-zinc-950/85 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-zinc-800/80 max-w-lg mb-3 shadow-xl">
                    {step.desc}
                  </p>

                  <div className="space-y-1.5 bg-zinc-950/60 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-zinc-800/60 max-w-md">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verificación estructural oficial Arq. Juve</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Modelado 3D fotorrealista a 60 FPS</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Structural Engineering Diagram Card (Fondo Blanco Limpio) */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-3 rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl relative overflow-hidden max-w-sm sm:max-w-md ml-auto">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className={`transition-all duration-500 ${
                    currentStep === idx ? 'opacity-100 scale-100 block' : 'opacity-0 scale-95 hidden'
                  }`}
                >
                  {/* Clean White Background Container matching exact diagrams 2.jpg to 9.jpg */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white p-3 flex flex-col items-center justify-center shadow-lg border border-zinc-200">
                    <img 
                      src={getAssetPath(step.diagram)} 
                      alt={step.title} 
                      className="max-h-full max-w-full object-contain filter contrast-125"
                    />
                  </div>

                  <div className="mt-2 text-center text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    ESQUEMA ESTRUCTURAL ARCH-3D • PASO {step.num}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Horizontal 8-Step Navigation Pills */}
        <div className="relative z-10 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          
          <div className="flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-800 overflow-x-auto max-w-full">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                  currentStep === idx
                    ? 'bg-white text-zinc-950 shadow-md'
                    : 'text-zinc-500'
                }`}
              >
                <span className="font-mono">{step.num}</span>
                <span className="hidden xl:inline truncate">{step.tag.split('.')[1]}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 animate-bounce">
            <span>HAZ SCROLL EN PANTALLA COMPLETA</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </div>

        </div>

      </div>
    </section>
  );
}
