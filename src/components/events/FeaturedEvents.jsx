import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

const FeaturedEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [carouselEvents] = useState([
    {
      id: 1,
      title: "Electronic Music Festival",
      date: "Aug 15, 2024",
      location: "Central Park",
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$45",
      attendees: "2.5K",
      rating: "4.8",
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "Aug 18, 2024",
      location: "Convention Center",
      image:
        "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$120",
      attendees: "1.2K",
      rating: "4.9",
    },
    {
      id: 3,
      title: "Food & Wine Tasting",
      date: "Aug 22, 2024",
      location: "Rooftop Venue",
      image:
        "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$65",
      attendees: "850",
      rating: "4.7",
    },
    {
      id: 4,
      title: "Art Exhibition Opening",
      date: "Aug 25, 2024",
      location: "Modern Gallery",
      image:
        "https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$25",
      attendees: "650",
      rating: "4.6",
    },
    {
      id: 5,
      title: "Jazz Night Live",
      date: "Aug 29, 2024",
      location: "Blue Note Club",
      image:
        "https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$35",
      attendees: "300",
      rating: "4.8",
    },
    {
      id: 6,
      title: "Comedy Show",
      date: "Aug 30, 2024",
      location: "Comedy Club",
      image:
        "https://images.pexels.com/photos/1627935/pexels-photo-1627935.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "$30",
      attendees: "200",
      rating: "4.5",
    },
  ]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev + 1) %
        Math.max(1, Math.ceil(carouselEvents.length / slidesPerView))
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(carouselEvents.length / slidesPerView)) %
        Math.max(1, Math.ceil(carouselEvents.length / slidesPerView))
    );
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, slidesPerView]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Featured Events
        </h2>
        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs transition-colors ${
              isAutoPlay ? "text-white" : "bg-gray-500/20 text-gray-400"
            }`}
            style={isAutoPlay ? { backgroundColor: "#a38b41" } : {}}
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

      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({
            length: Math.ceil(carouselEvents.length / slidesPerView),
          }).map((_, slideIndex) => (
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
                {carouselEvents
                  .slice(
                    slideIndex * slidesPerView,
                    (slideIndex + 1) * slidesPerView
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className="group relative cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#a38b41]/30 transition-all duration-500">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Ultra Modern Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="font-bold text-white mb-2 text-base sm:text-lg">
                              {event.title}
                            </h3>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-300 flex items-center">
                                <IoLocationOutline className="w-4 h-4 mr-1" />
                                {event.location}
                              </span>
                              <span
                                className="text-lg font-bold"
                                style={{ color: "#a38b41" }}
                              >
                                {event.price}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span className="flex items-center">
                                <BsPeople className="w-3 h-3 mr-1" />
                                {event.attendees}
                              </span>
                              <span className="flex items-center">
                                <FiHeart className="w-3 h-3 mr-1" />
                                {event.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Modern Glow Effect */}
                        <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-[#a38b41]/50 group-hover:ring-offset-2 group-hover:ring-offset-gray-800 transition-all duration-500"></div>

                        {/* Price Badge */}
                        <div
                          className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-lg font-semibold"
                          style={{ backgroundColor: "#a38b41" }}
                        >
                          {event.price}
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="mt-3 text-center">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-[#a38b41] transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-400">{event.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({
          length: Math.ceil(carouselEvents.length / slidesPerView),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-3"
                : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
            }`}
            style={index === currentSlide ? { backgroundColor: "#a38b41" } : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
