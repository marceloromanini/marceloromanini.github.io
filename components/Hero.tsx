import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs para animação
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Configuração inicial (set) para garantir que o elemento comece invisível/deslocado
    // mas sem depender de classes CSS que podem travar.
    gsap.set([line1Ref.current, line2Ref.current], { yPercent: 100 });
    gsap.set([subRef.current, ctaRef.current], { opacity: 0, y: 20 });

    // 1. Animação de Entrada
    tl.to([line1Ref.current, line2Ref.current], {
      yPercent: 0,
      duration: 1.5,
      stagger: 0.15,
      delay: 0.2
    })
    .to([subRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2
    }, "-=1.0");

    // 2. Parallax suave no Scroll
    if (textContainerRef.current && containerRef.current) {
      gsap.to(textContainerRef.current, {
        yPercent: 30, // Movimento vertical mais suave
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-20 overflow-hidden pt-20">
      {/* Background Element - Mais sutil */}
      <div className="absolute right-[-5%] top-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none opacity-60" />
      
      <div ref={textContainerRef} className="z-10 relative flex flex-col justify-center h-full">
        {/* Container da linha 1 */}
        <div className="overflow-hidden leading-[0.9]">
          <h1 ref={line1Ref} className="font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter text-white mix-blend-difference">
            MARCELO
          </h1>
        </div>
        
        {/* Container da linha 2 */}
        <div className="overflow-hidden leading-[0.9] mb-8 md:mb-12">
          <h1 ref={line2Ref} className="font-display font-bold text-[12vw] md:text-[10vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            ROMANINI
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-8 mt-4">
          <p ref={subRef} className="text-lg md:text-xl font-light text-gray-400 max-w-lg leading-relaxed">
            Senior Designer & Motion. <br />
            <span className="text-white">Criando narrativas visuais que definem marcas.</span>
          </p>
          
          <div ref={ctaRef} className="mt-8 md:mt-0">
             <a href="#projects" className="group cursor-pointer inline-flex items-center gap-4">
                <Magnetic>
                   <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                      <ArrowDownRight className="w-5 h-5 md:w-6 md:h-6 relative z-10 text-white group-hover:text-black transition-colors duration-300" />
                   </div>
                </Magnetic>
                <span className="uppercase text-xs md:text-sm tracking-[0.2em] font-medium opacity-80 group-hover:opacity-100 transition-opacity">Ver Projetos</span>
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;