import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const projects = [
  {
    title: "Neon Dystopia",
    category: "Publicidade",
    image: "bg-gradient-to-br from-purple-900 to-blue-900",
    video: "/project-neon.mp4",
    year: "2024"
  },
  {
    title: "Glitch Fashion",
    category: "Redes Sociais",
    image: "bg-gradient-to-br from-pink-900 to-red-900",
    video: "/project-glitch.mp4",
    year: "2024"
  },
  {
    title: "Cyber Corporate",
    category: "Corporativo",
    image: "bg-gradient-to-br from-gray-900 to-slate-800",
    video: "/project-cyber.mp4",
    year: "2023"
  },
  {
    title: "Bass Drop",
    category: "Música",
    image: "bg-gradient-to-br from-yellow-900 to-orange-900",
    video: "/project-bass.mp4",
    year: "2025"
  },
  {
    title: "Future Tech",
    category: "Tecnologia",
    image: "bg-gradient-to-br from-cyan-900 to-blue-800",
    video: "/project-future.mp4",
    year: "2025"
  },
  {
    title: "Retro Wave",
    category: "Arte Digital",
    image: "bg-gradient-to-br from-fuchsia-900 to-purple-800",
    video: "/project-retro.mp4",
    year: "2023"
  }
];

export function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleProjectClick = (index: number) => {
    setActiveProject(index);
    setTimeout(() => setActiveProject(null), 500); // Reset glitch after 500ms
  };

  const handleMouseEnter = (index: number) => {
    setHoveredProject(index);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(e => console.log("Video play failed", e));
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredProject(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust scroll amount as needed
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-zinc-950 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display text-white uppercase mb-2">
              Projetos <span className="text-stroke-white text-transparent">Selecionados</span>
            </h2>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors group"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors group"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`min-w-[300px] md:min-w-[500px] snap-center group relative aspect-[4/3] border border-white/10 overflow-hidden cursor-pointer ${activeProject === index ? 'glitch-transition' : ''}`}
              onClick={() => handleProjectClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Image Placeholder */}
              <div className={`absolute inset-0 ${project.image} transition-transform duration-500 group-hover:scale-110 ${activeProject === index ? 'glitch-flash' : ''} ${hoveredProject === index ? 'opacity-0' : 'opacity-100'}`} />
              
              {/* Video Preview */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={project.video}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Glitch Overlay Layers */}
              {activeProject === index && (
                <>
                  <div className="absolute inset-0 bg-meta-yellow mix-blend-difference opacity-50 translate-x-2" />
                  <div className="absolute inset-0 bg-meta-blue mix-blend-exclusion opacity-50 -translate-x-2" />
                </>
              )}

              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-white/60 border border-white/20 px-2 py-1">
                    {project.category}
                  </span>
                  <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0" />
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-3xl font-display text-white uppercase mb-1">
                    {project.title}
                  </h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-meta-yellow transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
