import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy loading implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play when visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isVisible]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-12 bg-meta-yellow" />
          <h2 className="text-4xl md:text-6xl font-display text-white uppercase">
            Showreel <span className="text-meta-blue">2025</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative aspect-video w-full border-4 border-white/10 group overflow-hidden bg-black">
          {/* Video Player */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            {isVisible && (
              <video 
                ref={videoRef}
                src="/showreel.mp4" 
                className="w-full h-full object-cover"
                muted 
                loop 
                playsInline
                onTimeUpdate={handleTimeUpdate}
              />
            )}
            {/* Dark overlay only when paused to make play button visible */}
            {!isPlaying && <div className="absolute inset-0 bg-black/40 transition-colors duration-300" />}
          </div>
          
          {/* Progress Bar - Only visible on hover */}
          <div className="absolute bottom-[60px] left-4 right-4 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-auto" onClick={handleSeek}>
            <div 
              className="h-full bg-meta-yellow transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* VHS Controls - Bottom */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex gap-4 font-mono text-xs text-meta-yellow tracking-widest pointer-events-auto items-center">
              <button 
                onClick={togglePlay}
                className="hover:text-white hover:bg-meta-yellow/20 px-2 py-1 border border-transparent hover:border-meta-yellow transition-all flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              
              <div className="flex items-center gap-2 group/volume">
                <button 
                  onClick={toggleMute}
                  className="hover:text-white hover:bg-meta-yellow/20 px-2 py-1 border border-transparent hover:border-meta-yellow transition-all flex items-center gap-2"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-meta-yellow [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
              </div>
            </div>
          </div>
          
          {/* Click Overlay to Play/Pause */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 z-0 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
