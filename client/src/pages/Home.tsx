import { GlitchButton } from "@/components/GlitchButton";
import { Footer } from "@/components/Footer";
import { Portfolio } from "@/components/Portfolio";
import { Showreel } from "@/components/Showreel";
import { Testimonials } from "@/components/Testimonials";
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  const playGlitchSound = () => {
    const audio = new Audio('/glitch.wav');
    audio.volume = 0.1;
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const playSuccessSound = () => {
    const audio = new Audio('/success.wav');
    audio.volume = 0.4;
    audio.play().catch(e => console.log('Audio play failed', e));
  };
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    // Move button to random position within ~200px radius
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    setBtnPosition({ x, y });
    playGlitchSound();
  };

  const handleLeave = () => {
    // Reset to original position after a short delay
    setTimeout(() => {
      setBtnPosition({ x: 0, y: 0 });
    }, 500);
  };

  const handleClick = () => {
    playSuccessSound();
    setShowModal(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative selection:bg-meta-yellow selection:text-black">
      {/* Global Effects */}
      <div className="scanlines" />
      <div className="noise-overlay" />
      
      {/* Logo */}
      <div className="fixed top-0 left-0 p-4 md:p-6 z-[60] mix-blend-difference w-full pointer-events-none">
        <img 
          src="/metalogo.png" 
          alt="Metaframe Logo" 
          className="w-28 sm:w-32 md:w-40 hover:scale-105 hover:rotate-1 transition-transform duration-200 cursor-pointer drop-shadow-[0_0_15px_rgba(255,237,0,0.6)] pointer-events-auto"
        />
      </div>

      

      {/* Main Content */}
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 pt-24 md:pt-4">
        
        {/* Background Collage Elements - Hero Only */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none h-screen">
          <img 
            src="/collage-background.png" 
            alt="Collage Texture" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-50"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Floating Elements (Parallax-ish) */}
        <div 
          className="absolute top-1/4 left-10 md:left-1/4 w-64 h-64 bg-meta-blue mix-blend-exclusion rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-10 md:right-1/4 w-96 h-96 bg-meta-yellow mix-blend-exclusion rounded-full blur-3xl opacity-20 animate-pulse delay-700"
          style={{ transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)` }}
        />

        {/* Central Hero Composition */}
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="md:col-span-7 flex flex-col gap-6 relative">
            {/* Glitch Headline */}
            <h1 className="text-6xl md:text-8xl font-display leading-[0.85] tracking-tighter uppercase relative z-20">
              <span className="block glitch-text" data-text="A REALIDADE">A REALIDADE</span>
              <span className="block text-transparent text-stroke-white">É UM ERRO</span>
              <span className="block bg-meta-yellow text-black px-2 transform -skew-x-12 w-fit">DE RENDERIZAÇÃO</span>
            </h1>

            {/* Manifesto Text */}
            <div className="font-mono text-sm md:text-base max-w-md bg-black/80 border border-white/20 p-6 backdrop-blur-sm transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <p className="mb-4">
                <span className="bg-meta-blue text-white px-1">Soluções visuais que impactam.</span> No mundo digital saturado, ser apenas "bonito" não é suficiente.
              </p>
              <p className="text-gray-400">
                Criamos narrativas visuais estratégicas que capturam a atenção e resolvem problemas de comunicação. Transformamos ruído em sinal claro e potente para sua marca.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 transform -rotate-2">
              <GlitchButton>
                ENTRE EM CONTATO
              </GlitchButton>
            </div>
          </div>

          {/* Right Visual Block (Sculpture) */}
          <div className="md:col-span-5 relative h-[60vh] md:h-[90vh] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full max-w-[600px] max-h-[800px]">
                <img 
                  src="/hero-final.png" 
                  alt="Statue with Glasses" 
                  className={`w-full h-full object-contain filter contrast-110 drop-shadow-[0_0_30px_rgba(0,74,173,0.3)] transition-all duration-300 ${isHoveringHero ? 'hue-rotate-90 saturate-200' : ''}`}
                  style={{
                    transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
                  }}
                  onMouseEnter={() => setIsHoveringHero(true)}
                  onMouseLeave={() => setIsHoveringHero(false)}
                />
                {/* Animated Glitch Overlay for Glasses Area */}
                <div 
                  className="absolute top-[30%] left-[25%] w-[50%] h-[15%] mix-blend-overlay opacity-50 pointer-events-none animate-pulse"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
                  }}
                />
                <div 
                  className="absolute top-[30%] left-[25%] w-[50%] h-[15%] mix-blend-color-dodge opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: 'url("/glitch-texture.png")', // Assuming a texture exists or just noise
                    backgroundSize: 'cover',
                    animation: 'glitch-anim 2s infinite linear alternate-reverse',
                    transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
                  }}
                />
              </div>
              
              {/* Decorative "Stickers" */}
              <div className="absolute top-10 right-0 bg-white text-black font-mono text-xs p-2 transform rotate-12 border-2 border-black shadow-[4px_4px_0px_0px_#004aad]">
                SYSTEM_FAILURE_001
              </div>
              <div 
                ref={btnRef}
                className="absolute bottom-20 left-0 z-20 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${btnPosition.x}px, ${btnPosition.y}px) rotate(-6deg)` }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={handleClick}
              >
                <div className="bg-meta-yellow text-black font-display text-xl p-4 border-2 border-black cursor-pointer select-none shadow-[4px_4px_0px_0px_#000]">
                  NÃO TOQUE
                </div>
              </div>
            </div>
          </div>

        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-zinc-950 border-meta-yellow text-white font-mono">
            <DialogHeader>
              <DialogTitle className="text-meta-yellow text-xl uppercase tracking-widest">Acesso Concedido</DialogTitle>
              <DialogDescription className="text-white/80 pt-4 text-lg">
                Você é teimoso. Gostamos disso. Vamos trabalhar juntos.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end pt-4">
              <Button 
                className="bg-meta-yellow text-black hover:bg-white font-bold uppercase tracking-wider"
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        

      </main>

      <Showreel />
      
      {/* Marquee Banner */}
      <div className="w-full bg-meta-yellow py-4 overflow-hidden border-y border-black relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-black text-black uppercase mx-8 tracking-tighter">
              METAFRAME ///
            </span>
          ))}
        </div>
      </div>

      <Portfolio />
      <Testimonials />
      <Footer />
      
      <style>{`
        .text-stroke-white {
          -webkit-text-stroke: 2px white;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .glitch-hover {
          animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          filter: hue-rotate(90deg) contrast(1.5);
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-10deg); }
          40% { transform: skew(10deg); }
          60% { transform: skew(-5deg); }
          80% { transform: skew(5deg); }
          100% { transform: skew(0deg); }
        }
      `}</style>
    </div>
  );
}
