import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import comedyNightImage from "../assets/images/comedy-night.png";
import summerBeatsMusicImage from "../assets/images/summer-beats-music.png";
import sportsFantasticsImage from "../assets/images/sports-fantastics.png";
import hollywoodImage from "../assets/images/hollywood-sign-night_Fotor.jpg";
const EventsSectionWrapper = styled.section`
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url(${hollywoodImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
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

const AllEventsButton = styled.a`
  display: block;
  background: linear-gradient(to right, #a18a3f, #c2ab67, #e6ca7c);
  color: #000;
  padding: 12px 30px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 1px;
  border-radius: 4px;
  margin: 40px auto 0;
  max-width: 200px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
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
      "A day with champions on the LBS Arena and come meet your favorite athletes. First 500 fans receive a free jersey",
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
    <EventsSectionWrapper id="events" className="py-12 2xl:py-16">
      <div className="container">
        <SectionTitle>GIGS EVENTS</SectionTitle>
        <SubTitle>POST YOUR GIG/ EVENTS "HERE FOR FREE"</SubTitle>

        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={80}
          slidesPerView={1}
          //   navigation={true}
          //   pagination={{ clickable: true }}
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
                  <ViewAllButton href={event.link}>View All</ViewAllButton>
                </EventContent>
              </EventCard>
            </SwiperSlide>
          ))}
        </StyledSwiper>

        <AllEventsButton href="#">VIEW ALL</AllEventsButton>
      </div>
    </EventsSectionWrapper>
  );
};

export default GigsEvents;
