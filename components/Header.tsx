import React, { useRef, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';
import gsap from 'gsap';

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Sobre", href: "#about" },
  { title: "Projetos", href: "#projects" },
  { title: "Skills", href: "#skills" },
  { title: "Contato", href: "#contact" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const logoRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  // Animação do Logo
  const handleMouseEnter = () => {
    const ctx = gsap.context(() => {
      gsap.to(mRef.current, { x: -3, duration: 0.3, ease: "power2.out" });
      gsap.to(rRef.current, { x: 3, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { 
        scale: 1.5, 
        color: '#00f0ff', 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      });
    }, logoRef);
    return () => ctx.revert();
  };

  const handleMouseLeave = () => {
    const ctx = gsap.context(() => {
      gsap.to([mRef.current, rRef.current], { x: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 1, color: '#ffffff', duration: 0.3 });
    }, logoRef);
    return () => ctx.revert();
  };

  // Animação do Menu
  useEffect(() => {
    // Config inicial
    gsap.set(menuRef.current, { yPercent: -100 });
    
    // Timeline pausada
    tlRef.current = gsap.timeline({ paused: true });
    
    tlRef.current
      .to(menuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .from(linksRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
      document.body.style.overflow = 'hidden'; // Bloqueia scroll
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = ''; // Libera scroll
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        {/* Logo */}
        <Magnetic>
          <div 
            ref={logoRef}
            className="group cursor-pointer select-none relative z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#home" onClick={() => setIsOpen(false)}>
              <span className="font-display font-bold text-2xl tracking-tighter inline-flex items-baseline">
                <span ref={mRef} className="inline-block">M</span>
                <span ref={rRef} className="inline-block">R</span>
                <span ref={dotRef} className="text-white inline-block ml-[1px]">.</span>
              </span>
            </a>
          </div>
        </Magnetic>
        
        {/* Menu Button */}
        <Magnetic>
          <div className="cursor-pointer p-2 group relative z-50" onClick={toggleMenu}>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className={`transition-all duration-300 absolute inset-0 flex items-center justify-center ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                   <Menu className="w-8 h-8 text-white" />
                </div>
                <div className={`transition-all duration-300 absolute inset-0 flex items-center justify-center ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                   <X className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </Magnetic>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#0a0a0a] z-40 flex items-center justify-center pointer-events-auto"
        style={{ visibility: 'visible' }} // Controlado pelo transform yPercent
      >
        <div ref={linksRef} className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <div key={index} className="overflow-hidden">
              <a 
                href={link.href}
                className="block font-display text-5xl md:text-7xl font-bold text-transparent text-stroke hover:text-white transition-colors duration-300 tracking-tighter cursor-none hover:tracking-wide transition-all"
                onClick={handleLinkClick}
              >
                {link.title}
              </a>
            </div>
          ))}
          
          <div className="mt-12 flex gap-8">
             <a href="#" className="text-gray-500 hover:text-accent text-sm uppercase tracking-widest">LinkedIn</a>
             <a href="#" className="text-gray-500 hover:text-accent text-sm uppercase tracking-widest">Behance</a>
             <a href="#" className="text-gray-500 hover:text-accent text-sm uppercase tracking-widest">Instagram</a>
          </div>
        </div>
        
        {/* Decorative Big Letters */}
        <div className="absolute bottom-10 left-10 pointer-events-none opacity-5">
            <span className="font-display font-bold text-9xl text-white">MR.</span>
        </div>
      </div>
    </>
  );
};

export default Header;