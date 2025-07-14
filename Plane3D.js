import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Plane3D() {
  const planeRef = useRef();
  const audioRef = useRef();
  const [is3D, setIs3D] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Replace these with your real plane image URLs
  const planeImages = [
    'https://static.vecteezy.com/system/resources/thumbnails/029/856/396/small/displaying-a-3d-miniature-propeller-plane-generative-ai-photo.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/029/856/396/small/displaying-a-3d-miniature-propeller-plane-generative-ai-photo.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/029/856/396/small/displaying-a-3d-miniature-propeller-plane-generative-ai-photo.jpg',
  ];

  useEffect(() => {
    gsap.to(planeRef.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    const interval = setInterval(() => {
      setIdleTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (idleTime >= 5) {
      rotatePlane(60);
      setIdleTime(0); // reset after auto-rotate
    }
  }, [idleTime]);

  const handleMouseMove = (e) => {
    setIdleTime(0); // reset idle on interaction
    if (!is3D) return;

    const el = planeRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    if (audioRef.current) audioRef.current.play();
  };

  const resetTilt = () => {
    const el = planeRef.current;
    if (el && is3D) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const rotatePlane = (angle = 360) => {
    const newRotation = rotation + angle;
    setRotation(newRotation);
    gsap.to(planeRef.current, {
      rotateY: newRotation,
      duration: 1.5,
      ease: 'power2.inOut',
    });
  };

  const toggleView = () => {
    setIs3D(!is3D);
    if (!is3D && planeRef.current) {
      gsap.to(planeRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
      });
    }
  };

  const nextPlane = () => {
    setActiveIndex((prev) => (prev + 1) % planeImages.length);
  };

  const prevPlane = () => {
    setActiveIndex((prev) => (prev - 1 + planeImages.length) % planeImages.length);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4 animate-fade-in-down">
          DigiMAG Toy Plane Preview 🛩️
        </h2>
        <p className="text-blue-600 mb-10 text-lg sm:text-xl animate-fade-in-up">
          Sleek, stylish, and fun — take a closer look at our inspired miniature plane!
        </p>

        <div className="flex justify-center mb-6 gap-4 flex-wrap">
          <button
            onClick={prevPlane}
            className="bg-white text-blue-600 px-4 py-2 rounded-full border hover:scale-105 transition"
          >
            ⬅️ Previous
          </button>
          <button
            onClick={() => rotatePlane()}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:scale-105 transition"
          >
            🔄 Spin Plane
          </button>
          <button
            onClick={toggleView}
            className="bg-white text-blue-600 px-6 py-2 rounded-full border hover:scale-105 transition"
          >
            {is3D ? '🖼️ Switch to 2D' : '🎮 Switch to 3D'}
          </button>
          <button
            onClick={nextPlane}
            className="bg-white text-blue-600 px-4 py-2 rounded-full border hover:scale-105 transition"
          >
            Next ➡️
          </button>
        </div>

        <div className="flex justify-center">
          <div
            className="relative group w-full max-w-3xl perspective"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <div
              ref={planeRef}
              className="transition-transform duration-300 will-change-transform"
            >
              <img
                src={planeImages[activeIndex]}
                alt="DigiMAG Plane Preview"
                className="w-full rounded-2xl shadow-2xl object-contain"
              />
              {/* Reflective shine overlay */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className="absolute left-[-100%] top-0 h-full w-1/2 bg-white opacity-10 blur-2xl animate-shineX" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/propeller.mp3" preload="auto" />

      {/* CSS animations */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
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

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }

        @keyframes shineX {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shineX {
          animation: shineX 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
