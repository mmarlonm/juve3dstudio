import React from 'react';
import { Phone, Mail, MapPin, Box, Send, Instagram } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0A0A0B] text-zinc-400 pt-16 pb-8 px-4 sm:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
        
        {/* Col 1: Brand & Address */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-1 border border-zinc-800 flex items-center justify-center">
              <img 
                src={getAssetPath('/assets/images/logo.png')} 
                alt="JUVE 3D STUDIO Logo" 
                className="w-full h-full object-contain filter invert brightness-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Box className="w-5 h-5 text-white hidden" />
            </div>


            <span className="font-extrabold text-base tracking-wider text-white">
              JUVE<span className="text-zinc-400">3D</span>STUDIO<span className="text-xs text-zinc-500 ml-0.5">®</span>
            </span>
          </div>

          <p className="text-zinc-400 max-w-sm text-xs leading-relaxed">
            Firma de arquitectura y visualización 3D fundada en 2014 en Saltillo, Coahuila por Diego Alejandro Alvarado de León ("El Arqui Juve").
          </p>

          <div className="space-y-2 pt-2 text-zinc-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Sede Principal: Saltillo, Coahuila, México</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>8 800 555-47-47</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>contacto@juve3dstudio.com</span>
            </div>
          </div>

        </div>

        {/* Col 2: Proyectos */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Proyectos</h4>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#proyectos" className="hover:text-white transition-colors">Casa Solail</a></li>
            <li><a href="#proyectos" className="hover:text-white transition-colors">Estudio del Lago</a></li>
            <li><a href="#proyectos" className="hover:text-white transition-colors">Torre Azur</a></li>
            <li><a href="#proyectos" className="hover:text-white transition-colors">Residencia Vista</a></li>
            <li><a href="#proyectos" className="hover:text-white transition-colors">Ver todos</a></li>
          </ul>
        </div>

        {/* Col 3: Servicios */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Servicios</h4>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#estudio" className="hover:text-white transition-colors">Conceptualización</a></li>
            <li><a href="#procesos" className="hover:text-white transition-colors">Modelado 3D BIM</a></li>
            <li><a href="#proyectos" className="hover:text-white transition-colors">Renderizado Fotorrealista</a></li>
            <li><a href="#procesos" className="hover:text-white transition-colors">Recorrido VR 360°</a></li>
            <li><a href="#contacto" className="hover:text-white transition-colors">Cotización rápida</a></li>
          </ul>
        </div>

        {/* Col 4: Información Legal & Socials */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Información Legal</h4>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Licencias de Software</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Derechos de Autor</a></li>
          </ul>

          <div className="pt-3">
            <h5 className="font-semibold text-zinc-300 text-[11px] mb-2 uppercase">Síguenos</h5>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="VK" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <span className="font-bold text-xs">VK</span>
              </a>
              <a href="#" aria-label="Telegram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-zinc-400 text-[11px] gap-2">
        <p>© 2026 JUVE3DStudio. Todos los derechos reservados.</p>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-zinc-500">Desarrollado por</span>
          <span className="text-zinc-200 font-extrabold tracking-wide uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
            MGM Tech Solutions
          </span>
        </div>
      </div>

    </footer>
  );
}
