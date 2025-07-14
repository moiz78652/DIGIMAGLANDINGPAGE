import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const aboutRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, scale: 0.95, rotateY: -15 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.5, ease: 'power4.out' }
    );
  }, []);

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Soft background glow effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-3xl top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-blue-300 opacity-20 rounded-full blur-3xl top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      <div
        ref={aboutRef}
        className="relative z-10 max-w-4xl mx-auto text-center border-l-8 border-pink-500 pl-6 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-8"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-400 to-pink-600 bg-clip-text text-transparent mb-6 animate-text-shimmer">
          What is DigiMAG?
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
          <span className="inline-block animate-fade-in">
            DigiMAG is not just a toy —
          </span>{' '}
          <span className="inline-block animate-fade-in delay-200">
            it’s a playful flight experience.
          </span>{' '}
          <span className="inline-block animate-fade-in delay-400">
            Made with imagination, durability, and joy at its core.
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes textShimmer {
          0% {
            background-position: -500%;
          }
          100% {
            background-position: 500%;
          }
        }

        .animate-text-shimmer {
          background-size: 200% auto;
          animation: textShimmer 3s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out both;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}
