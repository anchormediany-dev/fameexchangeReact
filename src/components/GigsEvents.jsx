// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { truncate } from "../utils/truncate";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import comedyNightImage from "../assets/images/comedy-night.png";
// import summerBeatsMusicImage from "../assets/images/summer-beats-music.png";
// import sportsFantasticsImage from "../assets/images/sports-fantastics.png";
// import hollywoodImage from "../assets/images/hollywood-sign-night_Fotor.jpg";
// import pop1 from "../assets/images/pop1.jpg";
// import pop2 from "../assets/images/pop2.jpg";
// import { Link } from "react-router-dom";
// import { useGetEventsQuery } from "../app/authApi";
// const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
// const FALLBACK_COVER =
//   "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";

// const resolveImage = (p) => {
//   if (!p) return "";
//   if (/^https?:|^data:/.test(p)) return p;
//   const normalized = p.replace(/\\/g, "/");
//   const base = CDN_BASE.replace(/\/$/, "");
//   const path = normalized.replace(/^\//, "");
//   return `${base}/${path}`;
// };

// const coverFor = (ev) =>
//   resolveImage(ev?.event_cover) ||
//   resolveImage(Array.isArray(ev?.event_images) ? ev.event_images[0] : "") ||
//   FALLBACK_COVER;

// const EventsSectionWrapper = styled.section`
//   width: 100%;
//   background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
//     url(${hollywoodImage});
//   background-size: cover;
//   background-position: center;
//   background-attachment: fixed;
//   position: relative;
//   overflow: hidden;

//   &::before,
//   &::after {
//     content: "";
//     position: absolute;
//     z-index: 1;
//     width: 500px;
//     height: 500px;
//     background: no-repeat;
//     background-size: contain;
//     background-position: center;
//     opacity: 0.5;
//   }

//   &::before {
//     top: 0;
//     left: 0;
//     background-image: url(${pop2});
//     background-position: left center;
//   }

//   &::after {
//     top: 0;
//     right: 0;
//     background-image: url(${pop1});
//     background-position: right center;
//   }

//   @media (max-width: 768px) {
//     &::before,
//     &::after {
//       width: 120px;
//       opacity: 0.15;
//     }
//   }
// `;

// const SectionTitle = styled.h2`
//   color: #a38b41;
//   text-align: center;
//   font-size: 1.5rem;
//   margin-bottom: 10px;
//   font-weight: 500;
//   letter-spacing: 1px;
// `;

// const SubTitle = styled.h1`
//   color: #a38b41;
//   text-align: center;
//   font-size: 2.5rem;
//   margin-bottom: 50px;
//   font-weight: 700;
//   letter-spacing: 2px;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }

//   @media (max-width: 480px) {
//     font-size: 1.5rem;
//   }
// `;

// const EventCard = styled.div`
//   background-color: rgba(25, 25, 25, 0.8);
//   border-radius: 8px;
//   overflow: hidden;
//   height: 450px;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-10px);
//   }

//   @media (max-width: 768px) {
//     height: 400px;
//   }
// `;

// const EventImageContainer = styled.div`
//   height: 220px;
//   overflow: hidden;
// `;

// const EventImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.5s ease;

//   ${EventCard}:hover & {
//     transform: scale(1.05);
//   }
// `;

// const EventContent = styled.div`
//   padding: 20px;
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const EventTitle = styled.h3`
//   color: #fff;
//   font-size: 1.25rem;
//   font-weight: 700;
//   margin-bottom: 10px;
//   text-align: center;
//   text-transform: uppercase;
//   letter-spacing: 1px;
// `;

// const EventDescription = styled.p`
//   color: #ccc;
//   font-size: 0.9rem;
//   line-height: 1.5;
//   margin-bottom: 20px;
//   text-align: center;
//   flex-grow: 1;
// `;

// const ViewAllButton = styled.a`
//   display: inline-block;
//   background-color: transparent;
//   color: #a38b41;
//   border: 2px solid #a38b41;
//   padding: 8px 20px;
//   text-align: center;
//   text-decoration: none;
//   text-transform: uppercase;
//   font-weight: 600;
//   font-size: 0.85rem;
//   letter-spacing: 1px;
//   border-radius: 4px;
//   margin: 0 auto;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #a38b41;
//     color: #000;
//   }
// `;

// // Custom Swiper Styles
// const StyledSwiper = styled(Swiper)`
//   padding: 20px 10px 50px;

//   .swiper-button-next,
//   .swiper-button-prev {
//     color: #d4af37;

//     &:hover {
//       color: #fff;
//     }

//     @media (max-width: 640px) {
//       display: none;
//     }
//   }

//   .swiper-pagination-bullet {
//     background: #666;
//     opacity: 0.6;
//   }

//   .swiper-pagination-bullet-active {
//     background: #d4af37;
//     opacity: 1;
//   }
// `;

// // Dummy Event Data
// const eventsData = [
//   {
//     id: 1,
//     title: "Summer Beats Music Festival",
//     description:
//       "The festival that will be sure to please so don't waste another minute and get your tickets",
//     image: summerBeatsMusicImage,
//     link: "#",
//   },
//   {
//     id: 2,
//     title: "Comedy Night Extravaganza",
//     description:
//       "Come and laugh your night away. An evening of joy and surprises one free drink with purchase per ticket holder",
//     image: comedyNightImage,
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "Sports Fanatic Championship",
//     description:
//       "A day with champions on the LBS Arena and come meet your favourite athletes. First 500 fans receive a free jersey",
//     image: sportsFantasticsImage,
//     link: "#",
//   },
//   {
//     id: 4,
//     title: "Hollywood Red Carpet Gala",
//     description:
//       "Walk the red carpet with celebrities and enjoy a night of glamour, entertainment, and fine dining",
//     image: summerBeatsMusicImage,
//     link: "#",
//   },
//   {
//     id: 5,
//     title: "Retro Movie Marathon",
//     description:
//       "Relive the magic of classic cinema with back-to-back screenings of iconic films from the golden era",
//     image: comedyNightImage,
//     link: "#",
//   },
//   {
//     id: 6,
//     title: "Jazz & Blues Night",
//     description:
//       "An intimate evening of soulful music featuring renowned artists performing timeless jazz and blues classics",
//     image: sportsFantasticsImage,
//     link: "#",
//   },
// ];

// const GigsEvents = () => {
//   const { data, isLoading, isError } = useGetEventsQuery();
//   const events = Array.isArray(data?.data) ? data.data : [];
//   const hasEvents = events.length > 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8 }}
//     >
//       <EventsSectionWrapper id="events" className="py-12 2xl:py-16">
//         <div className="container" style={{ position: "relative", zIndex: 2 }}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <SectionTitle>GIGS EVENTS</SectionTitle>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <SubTitle>POST YOUR GIG/ EVENTS "HERE FOR FREE"</SubTitle>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             {" "}
//             {isLoading ? (
//               <div
//                 style={{
//                   textAlign: "center",
//                   color: "#a38b41",
//                   margin: "40px 0",
//                 }}
//               >
//                 Loading…
//               </div>
//             ) : !hasEvents || isError ? (
//               <div
//                 style={{
//                   textAlign: "center",
//                   color: "#a38b41",
//                   margin: "40px 0",
//                 }}
//               >
//                 No events available.
//               </div>
//             ) : (
//               <StyledSwiper
//                 modules={[Navigation, Pagination, Autoplay]}
//                 spaceBetween={80}
//                 slidesPerView={1}
//                 autoplay={{
//                   delay: 5000,
//                   disableOnInteraction: false,
//                 }}
//                 breakpoints={{
//                   640: {
//                     slidesPerView: 2,
//                   },
//                   1024: {
//                     slidesPerView: 3,
//                   },
//                 }}
//               >
//                 {(isLoading ? [] : events).map((ev) => (
//                   <SwiperSlide key={ev._id}>
//                     <EventCard>
//                       <EventImageContainer>
//                         <EventImage src={coverFor(ev)} alt={ev.title} />
//                       </EventImageContainer>
//                       <EventContent>
//                         <EventTitle>{ev.title}</EventTitle>
//                         <EventDescription>
//                           {truncate(ev.details, 150)}
//                         </EventDescription>
//                         <Link to={`/event-details/${ev._id}`}>
//                           <ViewAllButton>View</ViewAllButton>
//                         </Link>
//                       </EventContent>
//                     </EventCard>
//                   </SwiperSlide>
//                 ))}
//               </StyledSwiper>
//             )}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//           >
//             {!hasEvents ||
//               (!isError && (
//                 <div className="flex justify-center">
//                   <motion.button
//                     className="custom-button-two"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Link to="/events"> VIEW ALL</Link>
//                   </motion.button>
//                 </div>
//               ))}
//           </motion.div>
//         </div>
//       </EventsSectionWrapper>
//     </motion.div>
//   );
// };

// export default GigsEvents;
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
import { useGetEventsQuery } from "../app/authApi";
import { truncate } from "../utils/truncate";

import hollywoodImage from "../assets/images/hollywood-sign-night_Fotor.jpg";
import pop1 from "../assets/images/pop1.jpg";
import pop2 from "../assets/images/pop2.jpg";

const CDN_BASE = import.meta.env.VITE_API_IMAGE_BASE_URL || "";
const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop";
const ACCENT = "#a38b41";

// ---- helpers (kept from your original file) ----
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

// ---- styled background wrapper (unchanged look) ----
const EventsSectionWrapper = styled.section`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url(${hollywoodImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 500px;
    height: 500px;
    background: no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0.5;
  }

  &::before {
    top: 0;
    left: 0;
    background-image: url(${pop2});
    background-position: left center;
  }

  &::after {
    top: 0;
    right: 0;
    background-image: url(${pop1});
    background-position: right center;
  }

  @media (max-width: 768px) {
    &::before,
    &::after {
      width: 120px;
      opacity: 0.15;
    }
  }
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

// ---- component using FeaturedEvents carousel design ----
const GigsEvents = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = Array.isArray(data?.data) ? data.data : [];
  const hasEvents = events.length > 0;

  // map API events to cards the way FeaturedEvents does
  const cards = useMemo(() => {
    return events.map((e) => {
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
      } catch (_) {}

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

  // carousel logic from FeaturedEvents
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
          {/* Headings (unchanged text) */}
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

          {/* Controls row (from FeaturedEvents) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-end mb-6 space-y-4 sm:space-y-0">
            {/* <h2
              className="text-xl font-bold"
              style={{
                background: `linear-gradient(to right, ${ACCENT}, #d4c374)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              All Events
            </h2> */}
            

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

          {/* Content */}
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
                {/* FeaturedEvents-like slider inside your background */}
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
                                      {/* Optional short blurb under date */}
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

                  {/* Dots */}
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

          {/* VIEW ALL (kept) */}
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
