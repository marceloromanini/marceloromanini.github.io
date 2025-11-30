import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Center the cursor elements initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // The higher the faster

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    // Animation Loop
    const loop = () => {
      // Smooth interpolation for the follower
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSet(mouse.x);
      ySet(mouse.y);
      xSetFollower(pos.x);
      ySetFollower(pos.y);
    };

    gsap.ticker.add(loop);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Detect hover on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      gsap.ticker.remove(loop);
    };
  }, []);

  return (
    <>
      {/* Small Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Follower Circle */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out mix-blend-difference
          ${isHovering ? 'w-16 h-16 bg-white/20 border-transparent backdrop-blur-[1px]' : 'w-10 h-10 opacity-50'}
        `}
      />
    </>
  );
};

export default CustomCursor;