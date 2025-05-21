import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import meet1 from "../assets/images/meet-1.png";
import meet2 from "../assets/images/meet-2.png";
import meet3 from "../assets/images/meet-3.png";
import meet4 from "../assets/images/meet-4.png";
import meet5 from "../assets/images/meet-5.png";
import bgMeetGreet from "../assets/images/bg-meet-greet.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../styles/MeetAndGreet.module.css";

const MeetAndGreet = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const meetAndGreetImages = [
    {
      id: 1,
      src: meet1,
      alt: "Fan with Taylor Swift",
    },
    {
      id: 2,
      src: meet2,
      alt: "MMA fighters with fans",
    },
    {
      id: 3,
      src: meet3,
      alt: "Emma Watson and Daniel Radcliffe with fans",
    },
    {
      id: 4,
      src: meet4,
      alt: "Cristiano Ronaldo with young fan",
    },
    {
      id: 5,
      src: meet5,
      alt: "Justin Bieber with fan",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="meet_greet"
      className={`${styles.section} py-12 2xl:py-16`}
    >
      {/* Animated background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.backgroundPattern}
      ></motion.div>

      <div className={`${styles.container} container`}>
        {/* Animated header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <p className="custom-heading-six text-[#a38b41]">THE INVERSE</p>
          <h2 className="custom-heading-one">
            MEET & GREET WITH YOUR FAVOURITE TALENT
          </h2>
        </motion.div>

        {/* Animated carousel container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.carouselContainer}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
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
            {meetAndGreetImages.map((image) => (
              <SwiperSlide key={image.id}>
                <motion.div
                  className={styles.slide}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.slideImage}
                  />
                  {/* Caption overlay that appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3"
                  >
                    <p className="text-white text-sm">{image.alt}</p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav buttons */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </motion.div>
      </div>

      {/* Add basic animation styling for swiper */}
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
    </section>
  );
};

export default MeetAndGreet;
