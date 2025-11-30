import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from '../types';

gsap.registerPlugin(ScrollTrigger);

const experiences: Experience[] = [
  {
    company: "Amakha Paris",
    role: "Diretor de Arte",
    period: "Ago 2025 - Presente",
    description: "Liderança criativa e soluções visuais para branding."
  },
  {
    company: "NFE.io",
    role: "Designer",
    period: "Jan 2025 - Set 2025",
    description: "Design de performance e campanhas orientadas a dados."
  },
  {
    company: "Vindi",
    role: "Designer & Motion",
    period: "2024",
    description: "Motion design para marketing e storytelling visual."
  },
  {
    company: "Vuno",
    role: "Designer",
    period: "2021 - 2024",
    description: "Design estratégico e comunicação visual integrada."
  }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!sectionRef.current) return;

    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );

    const items = listRef.current?.children;
    if(items) {
      gsap.fromTo(items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-20 bg-surface text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-10 text-white">Sobre.</h2>
          <p ref={textRef} className="text-xl md:text-2xl leading-relaxed text-gray-400">
            Especialista em <span className="text-white font-medium">Motion Graphics, UX/UI e Estratégias Visuais</span>. 
            Atualmente em São Paulo, transformo conceitos complexos em narrativas visuais impactantes.
            Minha abordagem une estética premium e funcionalidade para otimizar o engajamento e a conexão de marcas com o mercado.
          </p>
          
          <div className="mt-12 inline-block">
             <a href="#contact" className="text-accent underline underline-offset-8 decoration-1 hover:decoration-2 transition-all text-lg">
                Baixar CV Completo
             </a>
          </div>
        </div>

        <div ref={listRef} className="flex flex-col gap-8">
          <h3 className="font-display text-2xl mb-4 border-b border-white/10 pb-4">Timeline</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="group hover:pl-4 transition-all duration-300 border-l border-white/10 hover:border-accent pl-6 py-2">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{exp.company}</h4>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-lg font-medium text-gray-300 mb-1">{exp.role}</p>
              <p className="text-sm text-gray-500 font-light">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;