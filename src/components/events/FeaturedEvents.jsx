import { useEffect, useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

const ACCENT = "#a38b41";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&auto=format&fit=crop&q=60";

const FeaturedEvents = ({ events = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Build cards from parent events (only featured)
  // inside FeaturedEvents
  const cards = useMemo(() => {
    return events.map((e) => ({
      id: e.id,
      title: e.name,
      date: e.datetime
        ? new Date(e.datetime).toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "TBA",
      location: e.location || e.address || "—",
      image: e.cover || e.logo || e.images?.[0] || FALLBACK_IMG,
      price: e.regularPrice ? `$${e.regularPrice}` : "Free",
      metaLeft: e.category || e.type || "Event",
      metaRight: e.discountPercent ? `${e.discountPercent}% off` : "★",
    }));
  }, [events]);

  // responsive slides
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(cards.length / slidesPerView));

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % pageCount);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + pageCount) % pageCount);

  // autoplay
  useEffect(() => {
    if (!isAutoPlay || cards.length === 0) return;
    const id = setInterval(nextSlide, 3500);
    return () => clearInterval(id);
  }, [isAutoPlay, slidesPerView, cards.length]);

  // clamp slide if data/layout changes
  useEffect(() => {
    setCurrentSlide((p) => (p >= pageCount ? pageCount - 1 : p));
  }, [pageCount]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2
          className="text-xl font-bold"
          style={{
            background: `linear-gradient(to right, ${ACCENT}, #d4c374)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          All Events
        </h2>

        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <button
            onClick={() => setIsAutoPlay((v) => !v)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs transition-colors ${
              isAutoPlay ? "text-white" : "bg-gray-500/20 text-gray-400"
            }`}
            style={isAutoPlay ? { backgroundColor: ACCENT } : {}}
          >
            {isAutoPlay ? (
              <FiPause className="w-3 h-3" />
            ) : (
              <FiPlay className="w-3 h-3" />
            )}
            <span>Auto</span>
          </button>
          <div className="flex space-x-1">
            <button
              onClick={prevSlide}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <FiChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <FiChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {cards.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-300">
          No featured events available.
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: pageCount }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className={`grid gap-4 ${
                      slidesPerView === 1
                        ? "grid-cols-1"
                        : slidesPerView === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {cards
                      .slice(
                        slideIndex * slidesPerView,
                        (slideIndex + 1) * slidesPerView
                      )
                      .map((ev) => (
                        <div
                          key={ev.id}
                          className="group relative cursor-pointer"
                        >
                          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#a38b41]/30 transition-all duration-500">
                            <img
                              src={ev.image}
                              alt={ev.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="font-bold text-white mb-2 text-base sm:text-lg">
                                  {ev.title}
                                </h3>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm text-gray-300 flex items-center">
                                    <IoLocationOutline className="w-4 h-4 mr-1" />
                                    {ev.location}
                                  </span>
                                  {/* <span
                                    className="text-lg font-bold"
                                    style={{ color: ACCENT }}
                                  >
                                    Interested {ev.interested}
                                  </span> */}
                                  <span className="" style={{ color: ACCENT }}>
                                    Interested {ev.interested}
                                    {/* (9) */}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                  <span className="flex items-center">
                                    <BsPeople className="w-3 h-3 mr-1" />
                                    {ev.metaLeft}
                                  </span>
                                  <span className="flex items-center">
                                    <FiHeart className="w-3 h-3 mr-1" />
                                    {ev.metaRight}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Glow */}
                            <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-[#a38b41]/50 group-hover:ring-offset-2 group-hover:ring-offset-gray-800 transition-all duration-500" />

                            {/* Price/Badge */}
                            <div
                              className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-lg font-semibold"
                              style={{ backgroundColor: ACCENT }}
                            >
                              {ev.price}
                            </div>
                          </div>

                          <div className="mt-3 text-center">
                            <h4 className="font-semibold text-white mb-1 group-hover:text-[#a38b41] transition-colors">
                              {ev.title}
                            </h4>
                            <p className="text-sm text-gray-400">{ev.date}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? "w-8 h-3"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                }`}
                style={i === currentSlide ? { backgroundColor: ACCENT } : {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedEvents;
