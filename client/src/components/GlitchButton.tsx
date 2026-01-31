import { cn } from "@/lib/utils";
import { ArrowRight, Bomb } from "lucide-react";
import { useState } from "react";

interface GlitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GlitchButton({ children, className, ...props }: GlitchButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "relative group inline-flex items-center justify-center px-8 py-4 font-display text-xl uppercase tracking-widest transition-all duration-100",
        "bg-meta-yellow text-black border-2 border-black hover:bg-white hover:text-meta-blue hover:border-meta-yellow",
        "transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,237,0,1)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isHovered ? <Bomb className="w-6 h-6 animate-pulse" /> : null}
        {children}
        <ArrowRight className={cn("w-6 h-6 transition-transform", isHovered ? "translate-x-2" : "")} />
      </span>
      
      {/* Sticker effect background */}
      <div className="absolute inset-0 -z-10 bg-[url('/cta-sticker-bg.png')] bg-cover opacity-50 mix-blend-overlay" />
      
      {/* Glitch layers */}
      <span className="absolute top-0 left-0 -z-20 w-full h-full bg-meta-blue translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
