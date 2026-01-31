import { GlitchButton } from "@/components/GlitchButton";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-white relative z-10 border-t border-meta-yellow/20">
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-display uppercase mb-6">
            Sobre a <span className="text-transparent text-stroke-white">Metaframe</span>
          </h2>
          <p className="font-mono text-gray-400 mb-6 max-w-lg">
            Nascemos da insatisfação com o comum. Somos um coletivo de artistas digitais, editores e programadores visuais obcecados em quebrar a quarta parede. Não seguimos tendências, nós as corrompemos.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-meta-yellow hover:text-black transition-colors border border-white/10">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-red-600 hover:text-white transition-colors border border-white/10">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center text-center p-8 border border-white/10 bg-black/50 backdrop-blur-sm">
          <h3 className="font-display text-2xl uppercase mb-4">Vamos transformar sua ideia em realidade?</h3>
          <p className="font-mono text-xs text-gray-500 mb-8">
            Entre em contato e vamos conversar sobre seu projeto.
          </p>
          <GlitchButton>
            INICIAR PROJETO
          </GlitchButton>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/metalogo.png" alt="Metaframe Logo" className="w-24 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <span className="font-mono text-xs text-gray-600">© 2025 METAFRAME. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="font-mono text-xs text-gray-600 flex gap-4">
            <a href="#" className="hover:text-meta-yellow">PRIVACY_POLICY</a>
            <a href="#" className="hover:text-meta-yellow">TERMS_OF_CHAOS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
