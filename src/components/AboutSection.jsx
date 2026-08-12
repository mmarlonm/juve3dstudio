import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, CheckCircle2, Award, Users, Video, MapPin, GraduationCap, Calendar } from 'lucide-react';

export function AboutSection({ onOpenQuoteModal }) {
  return (
    <section id="estudio" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Arq. Juve Biography & Studio Philosophy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 rounded-3xl border border-zinc-800"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-xs font-mono text-zinc-300 mb-4">
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>FUNDADO EN 2014 • SALTILLO, COAHUILA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3 leading-tight uppercase">
              El Arqui Juve<br />
              <span className="text-zinc-400 text-2xl font-bold">Juve 3D Studio</span>
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
              <strong>Juve 3D Studio</strong> es el estudio de arquitectura y marca digital fundada por <strong>Diego Alejandro Alvarado de León</strong>, arquitecto egresado de la <em>Universidad La Salle</em> originario de Saltillo, Coahuila. Conocido popularmente como <strong>"El Arqui Juve"</strong>, se ha convertido en un fenómeno viral gracias a su contenido transparente sobre construcción, presupuestos honestos y diseño estructural.
            </p>

            <div className="space-y-2 mb-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Licenciatura en Arquitectura — Universidad La Salle</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Sede Principal: Saltillo, Coahuila, México</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>Estudio Establecido en 2014</span>
              </div>
            </div>
          </div>

          {/* Arq. Juve Official Founder Card */}
          <div className="pt-6 border-t border-zinc-800/80">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-800 shrink-0 shadow-xl">
                <img 
                  src="/assets/diagrams/1.jpg" 
                  alt="Diego Alejandro Alvarado de León - El Arqui Juve" 
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">Diego Alejandro Alvarado</h4>
                <p className="text-xs text-zinc-400 font-mono">"El Arqui Juve" • @juve3dstudio</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mt-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Arq. Univ. La Salle • Fundador</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="w-full py-3 px-4 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-between hover:bg-zinc-200 transition-colors shadow-lg group"
            >
              <span className="flex items-center gap-2">
                <span>Cotizar proyecto con El Arqui Juve</span>
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Center Column: Arq. Juve Featured Image / Interior Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-4 glass-panel p-3 rounded-3xl relative overflow-hidden group min-h-[380px] flex flex-col justify-end"
        >
          <img 
            src="/assets/images/kitchen-render.jpg" 
            alt="Interior Render Showcase Juve 3D Studio" 
            className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent rounded-2xl" />

          <div className="relative z-10 p-5">
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 mb-2 border border-zinc-700">
              SALTILLO, COAHUILA • ESTUDIO 2014
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Juve 3D Studio Arquitectura
            </h3>
            <p className="text-xs text-zinc-300 line-clamp-2">
              Supervisión técnica de obra, presupuestos reales y visualización 3D por Diego Alvarado.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Official Metrics & Social Reach */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3 flex flex-col justify-between gap-4"
        >
          {/* Social Media Phenomenon */}
          <div className="glass-panel p-6 rounded-3xl flex-1 flex flex-col justify-center border border-zinc-800">
            <div className="text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>COMUNIDAD OFICIAL</span>
            </div>
            <div className="text-4xl font-black text-white tracking-tight my-2">
              +10M
            </div>
            <p className="text-xs text-zinc-400">
              Seguidores en TikTok, Instagram y Facebook (@juve3dstudio)
            </p>
          </div>

          {/* Foundation Year */}
          <div className="glass-panel p-6 rounded-3xl flex-1 flex flex-col justify-center border border-zinc-800">
            <div className="text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>FUNDACIÓN</span>
            </div>
            <div className="text-4xl font-black text-white tracking-tight my-2">
              2014
            </div>
            <p className="text-xs text-zinc-400">
              Estudio fundado formalmente en Saltillo, Coahuila
            </p>
          </div>

          {/* University Credential */}
          <div className="glass-panel p-6 rounded-3xl flex-1 flex flex-col justify-center border border-zinc-800">
            <div className="text-xs font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>FORMACIÓN</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tight my-2 uppercase">
              La Salle
            </div>
            <p className="text-xs text-zinc-400">
              Licenciatura en Arquitectura
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
