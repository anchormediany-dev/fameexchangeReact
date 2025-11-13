import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import "./OurTeam.css";
import { useGetTeamQuery } from "../../app/authApi";
import { Link } from "react-router-dom";
import { imgSrc } from "../../utils/imgSrc";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1200&q=60";

const OurTeam = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTeamQuery();

  // From API: [{ _id, name, title, bio, imageUrl, isVisible, ... }]
  const teamMembers = Array.isArray(data?.data)
    ? data.data.filter((m) => m?.isVisible)
    : [];

  const truncate = (text = "", max = 50) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const end = cut.lastIndexOf(" ");
    const safe = end > 0 ? cut.slice(0, end) : text.slice(0, max - 1);
    return safe.trimEnd() + "…"; // never over 50 chars
  };

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
              style={{ width: "-webkit-fill-available" }}
              src={imageText}
              alt="Graphic Text"
            />
          </div>
        </div>

        {/* Loading / Error states (kept minimal to preserve layout) */}
        {isLoading ? (
          <div className="text-center text-gray-300 py-10">Loading team…</div>
        ) : isError ? (
          <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4">
            <span className="text-sm">
              {error?.data?.error ||
                error?.data?.message ||
                error?.error ||
                "Failed to load team."}
            </span>
            <button
              onClick={refetch}
              disabled={isFetching}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition text-sm"
            >
              {isFetching ? "Retrying…" : "Retry"}
            </button>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-gray-300 py-10">
            No team members to display.
          </div>
        ) : (
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
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-12"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member._id || member.id}>
                <div className=" rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                  <div className="aspect-square overflow-hidden">
                    {" "}
                    {/* or aspect-video, aspect-[4/3] */}
                    <img
                      src={imgSrc(member.imageUrl, FALLBACK_IMG)}
                      alt={member.name || "Team member"}
                       className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-white custom-heading-seven">
                      {member.name}
                    </h4>
                    <p className="text-white">{member.title}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {" "}
                      {truncate(member.bio, 80)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Custom pagination container (unchanged) */}
        {/* <div className="team-pagination flex justify-center mt-4 gap-2"></div> */}
      </div>{" "}
      <div className="flex justify-center">
        <Link to="/our-team" state={{ teamMembers }}>
          {" "}
          <button className="custom-button-two" href="#">
            VIEW ALL
          </button>
        </Link>
      </div>
    </section>
  );
};

export default OurTeam;
