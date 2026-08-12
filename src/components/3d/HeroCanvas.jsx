import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import { ArchitecturalStructure } from './ArchitecturalStructure';

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-xs text-zinc-400">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-2" />
        <span>Cargando escena 3D...</span>
      </div>
    </Html>
  );
}

export function HeroCanvas({ wireframeMode = false }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance',
          precision: 'mediump'
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 1.2, 7.5]} fov={45} />
        
        {/* Optimized Lighting setup */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.5} 
          color="#FFFFFF" 
        />
        <directionalLight 
          position={[-10, -5, -10]} 
          intensity={0.4} 
          color="#52525B" 
        />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#E4E4E7" />

        <Suspense fallback={<CanvasLoader />}>
          <ArchitecturalStructure wireframeOnly={wireframeMode} />
        </Suspense>
      </Canvas>
    </div>
  );
}

