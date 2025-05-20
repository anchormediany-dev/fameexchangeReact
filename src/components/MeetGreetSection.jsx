import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import meet1 from "../assets/images/meet-1.png";
import meet2 from "../assets/images/meet-2.png";
import meet3 from "../assets/images/meet-3.png";
import meet4 from "../assets/images/meet-4.png";
import meet5 from "../assets/images/meet-5.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MeetAndGreet = () => {
  // Mock data for the meet and greet images
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
    <section className="bg-black text-white py-12 2xl:py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-gradient-to-r from-transparent to-gray-800 opacity-10"></div>

      {/* Content container */}
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#a38b41] custom-heading-six mb-2">THE INVERSE</p>
          <h2 className="custom-heading-one">
            MEET & GREET WITH YOUR FAVOURITE TALENT
          </h2>
        </div>

        {/* Swiper carousel */}
        <div className="mt-10">
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
            }}
            navigation={true}
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
            className="celebrity-swiper"
          >
            {meetAndGreetImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-72 sm:h-80 md:h-96 object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CSS for Swiper customization */}
      <style jsx global>{`
        /* Custom styling for Swiper navigation and pagination */
        .celebrity-swiper .swiper-button-next,
        .celebrity-swiper .swiper-button-prev {
          color: #f59e0b;
          background-color: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .celebrity-swiper .swiper-button-next:after,
        .celebrity-swiper .swiper-button-prev:after {
          font-size: 18px;
        }

        .celebrity-swiper .swiper-pagination-bullet {
          background-color: #fff;
          opacity: 0.5;
        }

        .celebrity-swiper .swiper-pagination-bullet-active {
          background-color: #f59e0b;
          opacity: 1;
        }

        @media (max-width: 640px) {
          .celebrity-swiper .swiper-button-next,
          .celebrity-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default MeetAndGreet;
