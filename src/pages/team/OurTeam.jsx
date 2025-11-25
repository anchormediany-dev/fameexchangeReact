// pages/team/OurTeam.jsx
import { useLocation } from "react-router-dom";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import { imgSrc } from "../../utils/imgSrc";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1200&q=60";

const OurTeam = ({ teamMembers: propTeamMembers }) => {
  // If navigated via <Link to="/our-team" state={{ teamMembers }}>
  const location = useLocation();
  const stateMembers = location.state?.teamMembers;

  // Prefer explicit prop, else router state; both should be arrays
  const teamMembers = Array.isArray(propTeamMembers)
    ? propTeamMembers
    : Array.isArray(stateMembers)
    ? stateMembers
    : [];

  const openLink = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-12 2xl:py-16 mt-20 bg-[#171717]">
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="custom-heading-six text-[#a38b41] uppercase mb-2">
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

        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-300 py-10">
            No team members to display.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member) => {
              const linkedinUrl =
                member.linkedinUrl ||
                member.linkedin ||
                member.linkedin_link ||
                member.linkedinProfile ||
                "";
              const websiteUrl =
                member.websiteUrl ||
                member.website ||
                member.site ||
                member.website_link ||
                "";

              return (
                <div
                  key={member._id || member.id}
                  className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={imgSrc(member.imageUrl, FALLBACK_IMG)}
                      alt={member.name || "Team member"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Hover icons at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center gap-3 bg-black/70 rounded-full px-4 py-2">
                        {/* Website icon */}
                        <button
                          type="button"
                          onClick={() => openLink(websiteUrl)}
                          className={
                            "p-2 rounded-full transition-colors " +
                            (websiteUrl
                              ? "bg-white/10 hover:bg-[#a38b41] cursor-pointer"
                              : "bg-white/5 cursor-not-allowed opacity-60")
                          }
                          aria-label={
                            websiteUrl
                              ? `${member.name || "Team member"} website`
                              : "Website not available"
                          }
                        >
                          <FiGlobe className="w-4 h-4 text-white" />
                        </button>

                        {/* LinkedIn icon */}
                        <button
                          type="button"
                          onClick={() => openLink(linkedinUrl)}
                          className={
                            "p-2 rounded-full transition-colors " +
                            (linkedinUrl
                              ? "bg-white/10 hover:bg-[#0a66c2] cursor-pointer"
                              : "bg-white/5 cursor-not-allowed opacity-60")
                          }
                          aria-label={
                            linkedinUrl
                              ? `${member.name || "Team member"} LinkedIn`
                              : "LinkedIn not available"
                          }
                        >
                          <FaLinkedinIn className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h4 className="text-white custom-heading-seven">
                      {member.name}
                    </h4>
                    <p className="text-white">
                      {member.title || member.role || "—"}
                    </p>
                    {member.bio && (
                      <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
