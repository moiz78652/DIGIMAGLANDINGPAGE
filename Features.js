import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const features = [
  { icon: "🎨", title: "Custom Colors" },
  { icon: "🧒", title: "Kid-Friendly" },
  { icon: "💨", title: "Smooth Flight" },
  { icon: "🔋", title: "No Batteries" },
  { icon: "♻️", title: "Eco Design" },
  { icon: "🧠", title: "STEM-Based" },
];

export default function Features() {
  const containerRef = useRef();

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.feature-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  const handleMouseMove = (e, i) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateX(${(-y / 20)}deg) rotateY(${x / 20}deg) scale(1.05)`;
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section className="relative bg-yellow-50 py-24 px-6 overflow-hidden">
      {/* Background Animated Light */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-yellow-300 opacity-20 blur-3xl top-1/4 left-1/4 animate-pulse rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-300 opacity-20 blur-2xl top-1/2 right-1/4 animate-pulse rounded-full"></div>
      </div>

      <h2 className="relative z-10 text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-12 animate-gradient-text">
        Why You’ll Love It 💛
      </h2>

      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
      >
        {features.map((f, i) => (
          <div
            key={i}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={resetTilt}
            className="feature-card bg-white p-8 rounded-2xl shadow-lg transform transition-transform duration-300 text-center group"
          >
            <div className="text-5xl mb-4 transition duration-500 group-hover:scale-125 group-hover:animate-bounce">
              {f.icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-700 group-hover:text-pink-500 transition-colors duration-300">
              {f.title}
            </h4>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-text {
          background: linear-gradient(90deg, #ffb703, #fb7185, #3b82f6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientText 6s ease infinite;
        }

        .feature-card {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}