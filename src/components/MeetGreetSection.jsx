import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGetTalentQuery } from "../app/authApi";
import { imgSrc } from "../utils/imgSrc";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../styles/MeetAndGreet.module.css";
import { Link } from "react-router-dom";
const MeetAndGreet = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTalentQuery();

  const rawTalents = data?.taleUsers ?? [];
  const talents = rawTalents.filter((t) => !t?.isDeleted);
  console.log(talents, "talent data");
  console.log(talents);
  // ---- UI helpers ----
  const ErrorBlock = () => (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/5 px-6 py-10 text-center">
      <p className="text-red-400 font-medium">
        Couldn’t load talents. Please try again.
      </p>
      {process.env.NODE_ENV !== "production" && (
        <p className="text-xs text-red-300/70 max-w-[560px] break-words">
          {(() => {
            if (!error) return null;
            // RTK Query error shapes
            if ("status" in error) {
              const msg =
                (error.data && (error.data.message || error.data.error)) ||
                JSON.stringify(error.data || {}, null, 0);
              return `Status: ${error.status} ${msg ? `— ${msg}` : ""}`;
            }
            return error.message || String(error);
          })()}
        </p>
      )}
      <button
        onClick={() => refetch()}
        className="custom-button-two disabled:opacity-60"
        disabled={isFetching}
      >
        {isFetching ? "Retrying..." : "Retry"}
      </button>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className={styles.carouselContainer}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl bg-neutral-800/30 animate-pulse"
            style={{ aspectRatio: "3 / 4" }}
          />
        ))}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-default-200/40 bg-default/5 px-6 py-10 text-center">
      <p className="text-default-600">No talents found right now.</p>
      <button onClick={() => refetch()} className="custom-button-two">
        Refresh
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="inverse"
      className={`${styles.section} py-12 2xl:py-16`}
    >
      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.backgroundPattern}
      />

      <div className={`${styles.container} container`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <p className="custom-heading-six text-[#a38b41]">THE INVERSE</p>
          <h2 className="custom-heading-one">
            MEET & GREET WITH YOUR FAVORITE TALENT
          </h2>
        </motion.div>

        {/* Content (loading/error/empty/loaded) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.carouselContainer}
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : isError ? (
            <ErrorBlock />
          ) : talents.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                loop={talents.length > 1}
                autoplay={
                  talents.length > 1
                    ? { delay: 3000, disableOnInteraction: false }
                    : false
                }
                pagination={{
                  clickable: true,
                  bulletClass: styles.swiperPaginationBullet,
                  bulletActiveClass: styles.swiperPaginationBulletActive,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  navigationDisabledClass: styles.swiperNavBtnDisabled,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                }}
              >
                {talents.map((talentData, index) => {
                  const primary =
                    talentData?.images?.find?.((x) => x?.fileUrl)?.fileUrl ||
                    null;
                  const src = primary && imgSrc(primary);
                  return (
                    <SwiperSlide key={talentData?._id || index}>
                      <motion.div
                        className={styles.slide}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <img
                          src={src}
                          alt={
                            talentData?.stageName ||
                            talentData?.name ||
                            "Talent"
                          }
                          className={styles.slideImage}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                          }}
                        />
                        {/* Hover caption (kept for future content) */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3"
                        />
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Custom nav buttons */}
              {talents.length > 1 && (
                <>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Swiper styling */}
      <style jsx global>{`
        .swiper-slide-active {
          z-index: 2;
          transition: all 0.5s ease;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: #a38b41 !important;
          transition: transform 0.3s ease;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          transform: scale(1.2);
        }
        .swiper-pagination-bullet {
          transition: transform 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
        }
      `}</style>

      <Link to="/inverse" className="flex mt-10 justify-center">
        <motion.button
          className="custom-button-two"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          disabled={isLoading || isFetching}
        >
          {isLoading || isFetching ? "Loading..." : "VIEW ALL"}
        </motion.button>
      </Link>
    </section>
  );
};

export default MeetAndGreet;
