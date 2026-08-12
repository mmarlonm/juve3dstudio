import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

export function PageViewCounter() {
  const [views, setViews] = useState(1);

  useEffect(() => {
    // Retrieve stored views starting from 1 for exact real visits count
    const storageKey = 'juve3d_real_exact_views';
    const initialBaseViews = 1;
    
    let currentViews = parseInt(localStorage.getItem(storageKey), 10);
    if (isNaN(currentViews) || currentViews < initialBaseViews) {
      currentViews = initialBaseViews;
    } else {
      currentViews = currentViews + 1;
    }
    
    localStorage.setItem(storageKey, currentViews.toString());
    setViews(currentViews);


    // Track GA4 page_view event if gtag script is loaded
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-lg group hover:border-zinc-700 transition-colors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      
      <Eye className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
      
      <span className="font-bold text-white tracking-wider">
        {views.toLocaleString('es-MX')}
      </span>
      
      <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline">
        VISTAS EN VIVO
      </span>

      <TrendingUp className="w-3 h-3 text-emerald-400 hidden sm:inline" />
    </div>
  );
}
