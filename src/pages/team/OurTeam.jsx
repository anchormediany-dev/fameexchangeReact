// pages/team/OurTeam.jsx
import { useLocation } from "react-router-dom";
import imageText from "../../assets/images/fame-exchange-image-text.png";
import { imgSrc } from "../../utils/imgSrc";
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
            {teamMembers.map((member) => (
              <div
                key={member._id || member.id}
                className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col"
              >
                <div className="h-[450px] overflow-hidden">
                  <img
                    src={imgSrc(member.imageUrl, FALLBACK_IMG)}
                    alt={member.name || "Team member"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
