import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
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
    <section className={`${styles.section} py-12 2xl:py-16`}>
      <div className={styles.backgroundPattern}></div>

      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <p className="custom-heading-six text-[#a38b41]">THE INVERSE</p>
          <h2 className="custom-heading-one">
            MEET & GREET WITH YOUR FAVOURITE TALENT
          </h2>
        </div>

        <div className={styles.carouselContainer}>
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
                <div className={styles.slide}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.slideImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MeetAndGreet;
