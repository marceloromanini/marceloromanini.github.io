import React from 'react';

const skills = [
  "After Effects", "Cinema 4D", "Figma", "Premiere Pro", 
  "Photoshop", "Illustrator", "Growth Design", "Branding",
  "Visual Strategy", "UI/UX", "Art Direction"
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-accent text-black overflow-hidden relative">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex gap-12 items-center pr-12">
          {skills.map((skill, index) => (
            <span key={`a-${index}`} className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter opacity-80 hover:opacity-100 transition-opacity cursor-default">
              {skill} <span className="text-stroke mx-4 opacity-30">•</span>
            </span>
          ))}
        </div>
        <div className="animate-marquee flex gap-12 items-center pr-12 absolute top-0 left-0" style={{ animationDelay: '-12.5s' }}>
          {skills.map((skill, index) => (
            <span key={`b-${index}`} className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter opacity-80 hover:opacity-100 transition-opacity cursor-default">
              {skill} <span className="text-stroke mx-4 opacity-30">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;