import React from 'react';
import { Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Contact: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-[#050505] min-h-[80vh] flex flex-col justify-between" id="contact">
      <div>
        <h2 className="font-display text-[12vw] leading-none font-bold text-white mb-8">
          LET'S TALK
        </h2>
        <div className="h-px w-full bg-white/20 mb-12"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-6">
          <p className="text-gray-400 text-xl max-w-md">
            Disponível para projetos freelance e consultoria. Vamos criar algo memorável juntos.
          </p>
          <a href="mailto:marcelo@example.com" className="inline-flex items-center gap-2 text-3xl md:text-5xl font-bold text-white hover:text-accent transition-colors">
            marcelo@romanini.com
            <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
          </a>
        </div>

        <div className="flex gap-6">
          <Magnetic>
            <a href="#" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
              <Instagram className="w-6 h-6" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
              <span className="font-bold">Be</span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-20 flex justify-between text-sm text-gray-600 uppercase tracking-widest">
        <span>São Paulo, Brasil</span>
        <span>© {new Date().getFullYear()} Romanini</span>
      </div>
    </section>
  );
};

export default Contact;