import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const [proposal, setProposal] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProposal('');
      setEmail('');
    }, 4000);
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-[#18181B] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              CONTACTO DIRECTO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Contáctanos
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Comparte las dimensiones o bocetos preliminares de tu proyecto y recibe una estimación formal de alcance y tiempos de renderizado.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Presupuesto o propuesta..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white transition-colors"
                />

                <input
                  type="email"
                  required
                  placeholder="E-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white transition-colors"
                />

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Contáctanos</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>¡Mensaje recibido! Nos comunicaremos a <strong>{email}</strong> en menos de 24 horas.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
