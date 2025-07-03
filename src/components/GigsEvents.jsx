import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import comedyNightImage from "../assets/images/comedy-night.png";
import summerBeatsMusicImage from "../assets/images/summer-beats-music.png";
import sportsFantasticsImage from "../assets/images/sports-fantastics.png";
import hollywoodImage from "../assets/images/hollywood-sign-night_Fotor.jpg";
import pop1 from "../assets/images/pop1.jpg";
import pop2 from "../assets/images/pop2.jpg";
import { Link } from "react-router-dom";
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

const EventCard = styled.div`
  background-color: rgba(25, 25, 25, 0.8);
  border-radius: 8px;
  overflow: hidden;
  height: 450px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const EventImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${EventCard}:hover & {
    transform: scale(1.05);
  }
`;

const EventContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EventDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
  flex-grow: 1;
`;

const ViewAllButton = styled.a`
  display: inline-block;
  background-color: transparent;
  color: #a38b41;
  border: 2px solid #a38b41;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 1px;
  border-radius: 4px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a38b41;
    color: #000;
  }
`;

// Custom Swiper Styles
const StyledSwiper = styled(Swiper)`
  padding: 20px 10px 50px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #d4af37;

    &:hover {
      color: #fff;
    }

    @media (max-width: 640px) {
      display: none;
    }
  }

  .swiper-pagination-bullet {
    background: #666;
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background: #d4af37;
    opacity: 1;
  }
`;

// Dummy Event Data
const eventsData = [
  {
    id: 1,
    title: "Summer Beats Music Festival",
    description:
      "The festival that will be sure to please so don't waste another minute and get your tickets",
    image: summerBeatsMusicImage,
    link: "#",
  },
  {
    id: 2,
    title: "Comedy Night Extravaganza",
    description:
      "Come and laugh your night away. An evening of joy and surprises one free drink with purchase per ticket holder",
    image: comedyNightImage,
    link: "#",
  },
  {
    id: 3,
    title: "Sports Fanatic Championship",
    description:
      "A day with champions on the LBS Arena and come meet your favourite athletes. First 500 fans receive a free jersey",
    image: sportsFantasticsImage,
    link: "#",
  },
  {
    id: 4,
    title: "Hollywood Red Carpet Gala",
    description:
      "Walk the red carpet with celebrities and enjoy a night of glamour, entertainment, and fine dining",
    image: summerBeatsMusicImage,
    link: "#",
  },
  {
    id: 5,
    title: "Retro Movie Marathon",
    description:
      "Relive the magic of classic cinema with back-to-back screenings of iconic films from the golden era",
    image: comedyNightImage,
    link: "#",
  },
  {
    id: 6,
    title: "Jazz & Blues Night",
    description:
      "An intimate evening of soulful music featuring renowned artists performing timeless jazz and blues classics",
    image: sportsFantasticsImage,
    link: "#",
  },
];

const GigsEvents = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <EventsSectionWrapper id="events" className="py-12 2xl:py-16">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StyledSwiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={80}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {eventsData.map((event) => (
                <SwiperSlide key={event.id}>
                  <EventCard>
                    <EventImageContainer>
                      <EventImage src={event.image} alt={event.title} />
                    </EventImageContainer>
                    <EventContent>
                      <EventTitle>{event.title}</EventTitle>
                      <EventDescription>{event.description}</EventDescription>
                      <Link to="events">
                        {" "}
                        <ViewAllButton>View All</ViewAllButton>
                      </Link>
                    </EventContent>
                  </EventCard>
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-center">
              <motion.button
                className="custom-button-two"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/events"> VIEW ALL</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </EventsSectionWrapper>
    </motion.div>
  );
};

export default GigsEvents;
