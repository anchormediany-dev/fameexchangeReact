import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import teamOneImage from "../../assets/images/team-1.png";
import teamTwoImage from "../../assets/images/team-2.png";
import teamThreeImage from "../../assets/images/team-3.png";
import teamFourImage from "../../assets/images/team-4.png";
import "./OurTeam.css";
const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "DAVE ROMANO",
      role: "FOUNDER/CEO",
      image: teamOneImage,
      bio: "Visionary entrepreneur leading the Fame Exchange with a mission to redefine celebrity value.",
    },
    {
      id: 2,
      name: "VICTOR RAMOS",
      role: "Finance Manager",
      image: teamTwoImage,
      bio: "Experienced finance strategist ensuring sustainable growth and financial transparency.",
    },
    {
      id: 3,
      name: "CHRISTOPHER SHERILLO",
      role: "Lead Entertainment Counsel",
      image: teamThreeImage,
      bio: "Legal expert in the entertainment industry, guiding partnerships and IP strategy.",
    },
    {
      id: 4,
      name: "EDWARD GRAUER",
      role: "Operations Director",
      image: teamFourImage,
      bio: "Operations mastermind focused on efficiency, scalability, and seamless platform delivery.",
    },
  ];

  return (
    <section className="py-12 2xl:py-16 bg-[#171717]">
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="custom-heading-six text-[#a38b41] uppercase  mb-2">
            OUR TEAM
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            MEET OUR TEAM
          </h2>
          <div className="mt-2 w-full">
            <img
              style={{
                width: "-webkit-fill-available",
              }}
              src={imageText}
              alt="Graphic Text"
            />
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".team-pagination",
            bulletClass: "team-bullet",
            bulletActiveClass: "team-bullet-active",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <div className=" rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-white custom-heading-seven">
                    {member.name}
                  </h4>
                  <p className="text-white">{member.role}</p>
                  <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination container */}
        {/* <div className="team-pagination flex justify-center mt-4 gap-2"></div> */}
      </div>{" "}
      <div className="flex justify-center">
        <button className="custom-button-two" href="#">
          VIEW ALL
        </button>
      </div>
    </section>
  );
};

export default OurTeam;
