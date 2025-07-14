import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef();
  const planesRef = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Animate planes on load
    planesRef.current.forEach((el, i) => {
      gsap.to(el, {
        x: 'random(-150, 150)',
        y: 'random(-100, 100)',
        rotate: 'random(-30, 30)',
        duration: 6 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }, []);

  const handleMouseMove = (e, i) => {
    const el = planesRef.current[i];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `rotateX(${(-y) / 10}deg) rotateY(${x / 10}deg) scale(1.2)`;
  };

  const resetRotation = (i) => {
    const el = planesRef.current[i];
    if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // ✨ Plane takeoff animation on button click
  const handleExploreClick = () => {
    planesRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: '-200vh',
        opacity: 0,
        scale: 1.5,
        rotate: 45,
        duration: 1.5,
        delay: i * 0.1,
        ease: 'power2.in',
      });
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-pink-100 flex flex-col justify-center items-center text-center overflow-hidden px-4">
      
      {/* Flying Plane Emojis */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (planesRef.current[i] = el)}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={() => resetRotation(i)}
          className="absolute text-4xl transition-transform duration-200"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            zIndex: 1,
            cursor: 'grab',
          }}
        >
          ✈️
        </div>
      ))}

      {/* Hero Text */}
      <div className="relative z-10 max-w-2xl">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl font-extrabold text-blue-900 drop-shadow-lg mb-6"
        >
          Fly with DigiMAG 🛫
        </h1>
        <p className="text-lg text-blue-700 mb-8">
          The most exciting, interactive toy plane experience for kids and dreamers!
        </p>
        <button
          onClick={handleExploreClick}
          className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-md hover:scale-110 transition duration-300"
        >
          🚀 Explore Now
        </button>
      </div>
    </section>
  );
}
