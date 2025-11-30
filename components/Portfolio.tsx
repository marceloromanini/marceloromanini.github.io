import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  { id: 1, title: "Neon Genesis", category: "Motion Design", image: "https://picsum.photos/800/600?random=1", cols: 2, rows: 2 },
  { id: 2, title: "Fintech UI", category: "Product Design", image: "https://picsum.photos/400/600?random=2", cols: 1, rows: 2 },
  { id: 3, title: "Amakha Brand", category: "Art Direction", image: "https://picsum.photos/400/300?random=3", cols: 1, rows: 1 },
  { id: 4, title: "Vindi Growth", category: "Social Media", image: "https://picsum.photos/400/300?random=4", cols: 1, rows: 1 },
  { id: 5, title: "Institutional Reel", category: "Video Editing", image: "https://picsum.photos/800/400?random=5", cols: 2, rows: 1 },
  { id: 6, title: "Abstract 3D", category: "Cinema 4D", image: "https://picsum.photos/400/400?random=6", cols: 1, rows: 1 },
];

const Portfolio: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    
    Array.from(cards).forEach((card) => {
      gsap.fromTo(card, 
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        }
      );
    });
  }, []);

  return (
    <section className="py-32 px-6 md:px-20 bg-background" id="projects">
      <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
        <h2 className="font-display text-5xl md:text-8xl font-bold text-white tracking-tighter">
          SELECIONADOS
        </h2>
        <p className="text-gray-400 max-w-sm text-right">
          Uma coleção de trabalhos focados em performance, estética e movimento.
        </p>
      </div>

      {/* Bento Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`group relative rounded-2xl overflow-hidden cursor-none ${
              project.cols === 2 ? 'md:col-span-2' : 'md:col-span-1'
            } ${
              project.rows === 2 ? 'md:row-span-2' : 'md:row-span-1'
            }`}
          >
            {/* Image Background with Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

            {/* Content Content - Reveals on Hover */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                 <p className="text-accent text-sm font-bold uppercase tracking-wider mb-1">{project.category}</p>
                 <h3 className="font-display text-3xl font-bold text-white">{project.title}</h3>
              </div>
            </div>

            {/* Central Play Button/Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
               <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-8 h-8 text-white fill-white" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;