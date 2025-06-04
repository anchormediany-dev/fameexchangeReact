import { useState, useEffect } from "react";
import merchandiseImage from "../assets/images/merchandise.avif";

const CelebMerchandiseHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section className="relative bg-[#171717] text-white py-12 2xl:py-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-white custom-heading-one">
                <span
                  className={`inline-block transition-all duration-700 delay-200 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  Wear the Fame: Shop{" "}
                </span>
                <span
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a38b41] to-[#d4af37] transition-all duration-700 delay-400 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  Celebrity Merchandise
                </span>
              </h1>

              <p
                className={`text-gray-400  leading-relaxed transition-all duration-700 delay-600 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                Discover our exclusive line of premium celebrity merchandise.
                From limited-edition apparel to collectible accessories, each
                piece is designed to let you showcase your connection with your
                favorite stars.
              </p>
            </div>

            <button
              className={`
                inline-flex items-center 
              custom-button-two
                ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{ transitionDelay: "800ms" }}
            >
              <span>Shop Exclusive Collection</span>
            </button>
          </div>

          {/* Right Image Section */}
          <div className="relative flex justify-center lg:justify-end items-center">
            <div
              className={`relative transition-all duration-1000 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "600ms" }}
              onMouseMove={handleMouseMove}
            >
              {/* Main image container */}
              <div
                className="w-full max-w-xl h-96 lg:h-[32rem] xl:h-[36rem] overflow-hidden rounded-3xl shadow-2xl hover:shadow-[#a38b41]/30 transition-all duration-500 transform hover:scale-[1.02]"
                style={{
                  transform: `perspective(1000px) rotateY(${
                    mousePosition.x * 5 - 2.5
                  }deg) rotateX(${mousePosition.y * 5 - 2.5}deg) scale(${
                    1 + mousePosition.y * 0.03
                  })`,
                }}
              >
                <img
                  src={merchandiseImage}
                  alt="Premium celebrity merchandise"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-transparent hover:border-[#a38b41]/30 rounded-3xl transition-all duration-500"></div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#a38b41] rounded-full mix-blend-overlay opacity-20 blur-xl -z-10"></div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#d4af37] rounded-full mix-blend-overlay opacity-15 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: `radial-gradient(circle at center, #a38b41 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#a38b41]/5"></div>
      </div>
    </section>
  );
};

export default CelebMerchandiseHero;
