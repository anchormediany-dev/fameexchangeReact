import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { BiSolidDiscount } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useGetFeaturedEventsQuery } from "../app/authApi";
import { truncate } from "../utils/truncate";

import hollywoodImage from "../assets/home/HOLLYWOOD-NOSTALGIA.png";

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";
const ACCENT = "#a38b41";

// helpers
const resolveImage = (p) => {
  if (!p) return "";
  if (/^https?:|^data:/.test(p)) return p;
  const normalized = p.replace(/\\/g, "/");
  const base = CDN_BASE.replace(/\/$/, "");
  const path = normalized.replace(/^\//, "");
  return `${base}/${path}`;
};
const coverFor = (ev) =>
  resolveImage(ev?.event_cover) ||
  resolveImage(Array.isArray(ev?.event_images) ? ev.event_images[0] : "") ||
  FALLBACK_COVER;

// background wrapper (unchanged)
const EventsSectionWrapper = styled.section`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url(${hollywoodImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  color: #a38b41;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const SubTitle = styled.h1`
  color: #a38b41;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  font-weight: 700;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

/* 🔸 NEW: returns exactly `count` items per page, wrapping to the start */
function getPageItems(arr, pageIndex, count) {
  const start = pageIndex * count;
  const items = [];
  for (let i = 0; i < count; i++) {
    const idx = (start + i) % arr.length;
    items.push(arr[idx]);
  }
  return items;
}

const GigsEvents = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetFeaturedEventsQuery();
  const events = Array.isArray(data?.data) ? data.data : [];
  const featuredEvents = events.filter((event) => event?.is_featured === true);
  const hasEvents = featuredEvents.length > 0;

  const cards = useMemo(() => {
    return featuredEvents?.map((e) => {
      const when =
        e?.datetime ||
        e?.start_time ||
        e?.date ||
        e?.startDate ||
        e?.event_date ||
        null;
      let dateText = "TBA";
      try {
        if (when) {
          dateText = new Date(when).toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
        }
      } catch {}
      return {
        id: e?._id || e?.id,
        title: e?.title || e?.name || "Untitled Event",
        interested: e?.interested || e?.interestedCount || 0,
        date: dateText,
        location: e?.location || e?.address || e?.venue || "—",
        image: coverFor(e),
        price:
          e?.regularPrice || e?.ticket_price
            ? `$${e?.regularPrice ?? e?.ticket_price}`
            : "Free",
        metaLeft: e?.category || e?.type || "Event",
        metaRight:
          (e?.discountPercent && `${e.discountPercent}% off`) ||
          e?.tagline ||
          "★",
        blurb: truncate(e?.details || e?.description || "", 140),
      };
    });
  }, [events]);

  // original carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);

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

  // keep same pageCount logic; we’ll fill the last page via wrap-around
  const pageCount = Math.max(1, Math.ceil(cards.length / slidesPerView));
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % pageCount);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + pageCount) % pageCount);

  useEffect(() => {
    if (!isAutoPlay || cards.length === 0) return;
    const id = setInterval(nextSlide, 3500);
    return () => clearInterval(id);
  }, [isAutoPlay, slidesPerView, cards.length]);

  useEffect(() => {
    setCurrentSlide((p) => (p >= pageCount ? pageCount - 1 : p));
  }, [pageCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <EventsSectionWrapper id="events" className="py-12 2xl:py-16">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>GIGS EVENTS</SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SubTitle>POST YOUR GIG/ EVENTS "HERE FOR FREE"</SubTitle>
          </motion.div>

          {/* controls – unchanged */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-end mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center justify-between sm:justify-end space-x-3">
              <button
                onClick={() => setIsAutoPlay((v) => !v)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs transition-colors ${
                  isAutoPlay ? "text-white" : "bg-gray-500/20 text-gray-400"
                }`}
                style={isAutoPlay ? { backgroundColor: ACCENT } : {}}
              >
                {isAutoPlay ? (
                  <FiPause className="w-4 h-4" />
                ) : (
                  <FiPlay className="w-4 h-4" />
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

          {/* content – design unchanged, only the slice line is replaced */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isLoading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#a38b41",
                  margin: "40px 0",
                }}
              >
                Loading…
              </div>
            ) : !hasEvents || isError ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#a38b41",
                  margin: "40px 0",
                }}
              >
                No events available.
              </div>
            ) : (
              <>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 md:p-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="flex transition-transform duration-700 ease-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {Array.from({ length: pageCount }).map(
                        (_, slideIndex) => (
                          <div
                            key={slideIndex}
                            className="w-full flex-shrink-0"
                          >
                            <div
                              className={`grid gap-4 ${
                                slidesPerView === 1
                                  ? "grid-cols-1"
                                  : slidesPerView === 2
                                  ? "grid-cols-1 sm:grid-cols-2"
                                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                              }`}
                            >
                              {/* 🔸 ONLY THIS LINE CHANGED */}
                              {(cards.length > 0
                                ? getPageItems(cards, slideIndex, slidesPerView)
                                : []
                              ).map((ev) => (
                                <div
                                  key={ev.id}
                                  className="group relative cursor-pointer"
                                >
                                  <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                      ev?.id &&
                                      navigate(`/event-details/${ev.id}`)
                                    }
                                  >
                                    <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#a38b41]/30 transition-all duration-500">
                                      <img
                                        src={ev.image}
                                        alt={ev.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      />

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
                                            <span
                                              className="flex gap-1 items-center"
                                              style={{ color: ACCENT }}
                                            >
                                              <FiHeart className="w-4 h-4 mr-1" />
                                              <span>
                                                {" "}
                                                Interested ({ev.interested})
                                              </span>
                                            </span>
                                          </div>

                                          <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span className="flex items-center">
                                              <BsPeople className="w-4 h-4 mr-1" />
                                              {ev.metaLeft}
                                            </span>
                                            <span className="flex gap-1 items-center">
                                              <BiSolidDiscount className="w-4 h-4" />
                                              <span> {ev.metaRight}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-[#a38b41]/50 group-hover:ring-offset-2 group-hover:ring-offset-gray-800 transition-all duration-500" />

                                      <div
                                        className="absolute top-3 right-3 text-white text-xs px-2 py-1 rounded-lg font-semibold"
                                        style={{ backgroundColor: ACCENT }}
                                      >
                                        {ev.price}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3 text-center">
                                    <button
                                      className="cursor-pointer"
                                      onClick={() =>
                                        ev?.id &&
                                        navigate(`/event-details/${ev.id}`)
                                      }
                                    >
                                      <h4 className="font-semibold text-white mb-1 group-hover:text-[#a38b41] transition-colors">
                                        {ev.title}
                                      </h4>
                                    </button>
                                    <p className="text-sm text-gray-400">
                                      {ev.date}
                                    </p>
                                    {ev.blurb && (
                                      <p className="text-xs text-gray-400 mt-1">
                                        {ev.blurb}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* dots – unchanged */}
                  <div className="flex justify-center items-center mt-6 space-x-2">
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`transition-all duration-300 rounded-full ${
                          i === currentSlide
                            ? "w-8 h-3"
                            : "w-4 h-4 bg-gray-600 hover:bg-gray-500"
                        }`}
                        style={
                          i === currentSlide ? { backgroundColor: ACCENT } : {}
                        }
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* VIEW ALL – unchanged */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {!hasEvents || !isError ? (
              <div className="flex justify-center mt-6">
                <motion.button
                  className="custom-button-two"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/events"> VIEW ALL</Link>
                </motion.button>
              </div>
            ) : null}
          </motion.div>
        </div>
      </EventsSectionWrapper>
    </motion.div>
  );
};

export default GigsEvents;
