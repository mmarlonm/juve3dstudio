import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalScene } from './3d/ArchitecturalScene';
import { Box, Layers, Sparkles, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function PinnedExperience() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Use gsap.context() for safe React mounting & unmounting cleanup
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP instances
  }, []);

  // Compute active stage index (0, 1, or 2)
  const currentStage = scrollProgress < 0.33 ? 0 : scrollProgress < 0.66 ? 1 : 2;

  const stagesMeta = [
    {
      num: '01',
      title: '01. Levantamiento & Blueprint',
      subtitle: 'Malla tridimensional paramétrica y definición de ejes en alambre/wireframe.',
      badge: 'ESTRUCUTRA EN ALAMBRE (WIREFRAME)',
      icon: Box,
    },
    {
      num: '02',
      title: '02. Volumetría y Modelado 3D',
      subtitle: 'Conmutación a volumetría sólida con masa arquitectónica y planos delimitantes.',
      badge: 'MODELADO Y VOLUMETRÍA 3D',
      icon: Layers,
    },
    {
      num: '03',
      title: '03. Renderizado Fotorrealista',
      subtitle: 'Iluminación fotométrica, sombras dinámicas y acabados hiperrealistas PBR.',
      badge: 'ILUMINACIÓN & RENDER FINAL',
      icon: Sparkles,
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0F0F10]">
      {/* Pinned Wrapper Container */}
      <div 
        ref={triggerRef} 
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 bg-grid-pattern"
      >
        
        {/* Background WebGL Three.js Canvas */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Canvas
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', precision: 'mediump' }}
            className="w-full h-full"
          >
            <PerspectiveCamera makeDefault position={[0, 1.2, 7.5]} fov={45} />
            <ArchitecturalScene scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Top Header overlay (pointer-events-none) */}
        <div className="relative z-10 pointer-events-none flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            EXPERIENCIA 3D INTERACTIVA • GSAP SCROLLTRIGGER
          </div>

          {/* Progress Indicator Bar */}
          <div className="hidden sm:flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400">FASE {currentStage + 1} / 3</span>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-150" 
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stage Overlays (pointer-events-none to pass mouse & scroll) */}
        <div className="relative z-10 pointer-events-none max-w-xl my-auto">
          {stagesMeta.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = currentStage === idx;
            return (
              <div 
                key={stage.num}
                className={`transition-all duration-700 ${
                  isActive 
                    ? 'opacity-100 translate-y-0 relative' 
                    : 'opacity-0 translate-y-6 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 backdrop-blur-md border border-zinc-700 text-[11px] font-mono text-zinc-300 mb-4">
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{stage.badge}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                  {stage.title}
                </h2>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed bg-zinc-950/60 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/80 max-w-lg">
                  {stage.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: 3-step navigation pill indicators & scroll prompt */}
        <div className="relative z-10 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Step Selector Pills */}
          <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-800">
            {stagesMeta.map((stage, idx) => (
              <div
                key={stage.num}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  currentStage === idx
                    ? 'bg-white text-zinc-950 shadow-lg'
                    : 'text-zinc-500'
                }`}
              >
                <span className="font-mono">{stage.num}</span>
                <span className="hidden md:inline">{stage.title.split('.')[1]}</span>
              </div>
            ))}
          </div>

          {/* Scroll Down Prompt */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 animate-bounce">
            <span>HAZ SCROLL PARA EXPLORAR</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
          </div>

        </div>

      </div>
    </div>
  );
}
