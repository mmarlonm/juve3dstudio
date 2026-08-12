import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calculator, Send, Sparkles, Building, Layers, Compass } from 'lucide-react';

export function QuoteModal({ isOpen, onClose, initialService = 'Modelado 3D' }) {
  const [serviceType, setServiceType] = useState(initialService);
  const [area, setArea] = useState(150);
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { name: 'Modelado 3D', rate: 45, icon: Building },
    { name: 'Renderizado', rate: 65, icon: Layers },
    { name: 'Recorrido Virtual', rate: 95, icon: Compass },
    { name: 'Proyecto Integral', rate: 120, icon: Sparkles },
  ];

  const currentRate = services.find(s => s.name === serviceType)?.rate || 50;
  const estimatedTotal = area * currentRate;
  const estimatedDays = Math.max(3, Math.ceil(area / 40));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <Calculator className="w-4 h-4 text-zinc-400" />
                <span>COTIZADOR INTERACTIVO AL INSTANTE</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">
                Solicitar Cotización 3D
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">
                    1. SELECCIONA EL SERVICIO REQUERIDO
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {services.map((s) => {
                      const Icon = s.icon;
                      const isSelected = serviceType === s.name;
                      return (
                        <button
                          type="button"
                          key={s.name}
                          onClick={() => setServiceType(s.name)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white text-zinc-950 border-white font-bold shadow-md'
                              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-zinc-950' : 'text-zinc-400'}`} />
                          <span className="text-xs">{s.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Superficie m² Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-zinc-400">
                      2. SUPERFICIE APROXIMADA (m²)
                    </label>
                    <span className="text-sm font-bold text-white font-mono bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700">
                      {area} m²
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="1000" 
                    step="10"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                    <span>30 m²</span>
                    <span>500 m²</span>
                    <span>1,000+ m²</span>
                  </div>
                </div>

                {/* Estimate Summary Box */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">Estimado de Inversión</span>
                    <span className="text-2xl font-black text-white tracking-tight">
                      ${estimatedTotal.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">MXN</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">Tiempo Estimado</span>
                    <span className="text-sm font-bold text-zinc-300 font-mono">
                      ~{estimatedDays} días hábiles
                    </span>
                  </div>
                </div>

                {/* Contact Email & Message */}
                <div className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico empresarial..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white transition-colors"
                  />

                  <textarea
                    rows={2}
                    placeholder="Detalles adicionales del proyecto o requerimientos especiales (opcional)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar y Recibir Propuesta Formal</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                ¡Solicitud Enviada!
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                Hemos recibido tus datos. El equipo del Arq. Juve se pondrá en contacto contigo en breve a <strong>{email}</strong> con la propuesta formal.
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
