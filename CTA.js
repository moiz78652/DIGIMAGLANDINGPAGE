import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function CTA() {
  const sectionRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
    );
  }, []);

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleClick = () => {
    launchConfetti();
    // You can also redirect to purchase or play sound here
    // window.location.href = "/checkout"; // example
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-pink-600 via-pink-500 to-pink-400 text-white py-24 px-6 text-center overflow-hidden"
    >
      {/* Background Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-5 h-5 bg-white bg-opacity-10 rounded-full blur-sm animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-fade-in-down">
          Ready for Takeoff? 🎯
        </h2>
        <p className="mb-8 text-lg sm:text-xl animate-fade-in-up">
          Get your DigiMAG toy plane today and bring dreams to life!
        </p>

        <button
          onClick={handleClick}
          className="relative inline-block px-10 py-4 font-bold text-pink-600 bg-white rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white via-pink-100 to-white opacity-0 group-hover:opacity-100 group-hover:animate-shine"></span>
          <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            Buy Now ✈️
          </span>
          <span className="absolute inset-0 rounded-full border border-white border-opacity-50 group-hover:animate-ping z-0"></span>
        </button>
      </div>

      {/* Shine and Entrance CSS */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .group-hover\\:animate-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine 1s forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
