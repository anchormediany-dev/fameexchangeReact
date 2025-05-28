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
import { Link } from "react-router-dom";

const MeetAndGreet = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const celebrities = [
    {
      id: 1,
      name: "Taylor Swift",
      category: "MUSICIAN",
      src: meet1,
      description:
        "Global superstar known for her storytelling songwriting, multiple Grammy wins, and record-breaking albums that have defined a generation of music lovers worldwide.",
      popularity: 95,
      price: "$2,500",
    },
    {
      id: 2,
      name: "Ryan Reynolds",
      category: "ACTOR",
      src: meet2,
      description:
        "Canadian-American actor known for Deadpool, his witty social media presence, and charismatic performances in both comedy and action films.",
      popularity: 88,
      price: "$3,200",
    },
    {
      id: 3,
      name: "Lionel Messi",
      category: "ATHLETE",
      src: meet3,
      description:
        "Argentine football legend and former Ballon d'Or winner, widely regarded as one of the greatest players of all time with an extraordinary career spanning decades.",
      popularity: 92,
      price: "$5,000",
    },
    {
      id: 4,
      name: "MrBeast",
      category: "INFLUENCER",
      src: meet4,
      description:
        "YouTube sensation known for elaborate challenges, massive giveaways, and philanthropic that has revolutionized content creation and online entertainment.",
      popularity: 90,
      price: "$1,800",
    },
    {
      id: 5,
      name: "Emma Stone",
      category: "ACTOR",
      src: meet5,
      description:
        "Academy Award-winning actress known for her versatile performances in both comedy and drama, with memorable roles in La La Land and Easy A.",
      popularity: 85,
      price: "$2,800",
    },
    {
      id: 6,
      name: "The Weeknd",
      category: "MUSICIAN",
      src: meet1,
      description:
        "Grammy-winning artist known for his distinctive voice, atmospheric sound, and chart-topping hits that have redefined modern R&B and pop music.",
      popularity: 87,
      price: "$2,200",
    },
    {
      id: 7,
      name: "LeBron James",
      category: "ATHLETE",
      src: meet2,
      description:
        "NBA legend and four-time champion known for his incredible athleticism, business ventures, and advocacy for social justice and education.",
      popularity: 91,
      price: "$4,500",
    },
    {
      id: 8,
      name: "Kim Kardashian",
      category: "REALITY STAR",
      src: meet3,
      description:
        "Media mogul and reality TV star known for building a business empire, influencing fashion and beauty trends, and her legal advocacy work.",
      popularity: 89,
      price: "$3,500",
    },
    {
      id: 9,
      name: "Dwayne Johnson",
      category: "ACTOR",
      src: meet4,
      description:
        "Former WWE superstar turned Hollywood megastar, known for his action-packed movies, motivational presence, and positive influence across entertainment and fitness.",
      popularity: 93,
      price: "$4,000",
    },
    {
      id: 10,
      name: "Billie Eilish",
      category: "MUSICIAN",
      src: meet5,
      description:
        "Grammy-winning pop sensation known for her unique style, powerful vocals, and innovative music videos that have captivated millions of fans globally.",
      popularity: 86,
      price: "$2,000",
    },
    {
      id: 11,
      name: "Serena Williams",
      category: "ATHLETE",
      src: meet1,
      description:
        "Tennis legend with 23 Grand Slam singles titles, known for her dominance on court, business ventures, and advocacy for equality in sports.",
      popularity: 88,
      price: "$3,800",
    },
    {
      id: 12,
      name: "Zendaya",
      category: "ACTOR",
      src: meet2,
      description:
        "Versatile actress and fashion icon known for Spider-Man, Euphoria, and Dune, representing a new generation of talent both in acting and in Hollywood.",
      popularity: 84,
      price: "$2,600",
    },
    {
      id: 13,
      name: "Gordon Ramsay",
      category: "REALITY STAR",
      src: meet3,
      description:
        "World-renowned chef and television personality known for his culinary expertise, fiery personality, and successful restaurant empire spanning the globe.",
      popularity: 82,
      price: "$2,300",
    },
    {
      id: 14,
      name: "Cristiano Ronaldo",
      category: "ATHLETE",
      src: meet4,
      description:
        "Portuguese football icon and five-time Ballon d'Or winner, known for his incredible goal-scoring record and dedication to fitness and excellence.",
      popularity: 94,
      price: "$6,000",
    },
    {
      id: 15,
      name: "Ariana Grande",
      category: "MUSICIAN",
      src: meet5,
      description:
        "Pop superstar with a powerful four-octave vocal range, known for her chart-topping albums and sold-out world tours that captivate millions.",
      popularity: 89,
      price: "$2,400",
    },
    {
      id: 16,
      name: "Kylie Jenner",
      category: "REALITY STAR",
      src: meet1,
      description:
        "Beauty entrepreneur and reality star who built a billion-dollar cosmetics empire, known for setting trends in fashion and social media.",
      popularity: 83,
      price: "$3,000",
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
            {celebrities.map((image) => (
              <SwiperSlide key={image.id}>
                <motion.div
                  className={styles.slide}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <img
                    src={image.src}
                    alt={image.src}
                    className={styles.slideImage}
                  />
                  {/* Caption overlay that appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3"
                  >
                    <p className="text-white text-sm">{image.category}</p>
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
      <Link to="/meet-greet" className="flex mt-10 justify-center">
        <motion.button
          className="custom-button-two"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          VIEW ALL
        </motion.button>
      </Link>
    </section>
  );
};

export default MeetAndGreet;
