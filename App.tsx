import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    // Configuração "Lighter" e mais responsiva
    const lenis = new Lenis({
      duration: 1.2, // Duração padrão para sensação premium mas não pesada
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Sincronizar Lenis com GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Adicionar Lenis ao RAF (Request Animation Frame)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desligar a atualização automática do GSAP ticker para o Lenis assumir o controle se necessário
    // (Mas neste setup simples, usar o ticker do GSAP para rodar o lenis é uma boa prática)
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-background text-white selection:bg-accent selection:text-black">
      <CustomCursor />
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
    </main>
  );
};

export default App;