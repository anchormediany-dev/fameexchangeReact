import { useParams } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { useGetTeamQuery } from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";
import { handleImageError } from "../../utils/imagePlaceholder";
import { openExternal } from "../../utils/nativeLinks";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1200&q=60";

export default function TeamMemberBioPage() {
  const { slug } = useParams();
  const { data, isLoading } = useGetTeamQuery();

  const members = Array.isArray(data?.data) ? data.data : [];
  const member = members.find((m) => m?.slug === slug && m?.isVisible);

  return (
    <MotionPageWrapper>
      <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        <main className="flex-grow pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {isLoading ? (
              <div className="text-center text-gray-400 py-20">Loading…</div>
            ) : !member ? (
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Team Member Not Found
                </h1>
                <p className="text-gray-400">
                  This person may no longer be with The Fame Exchange.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* Photo column */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl overflow-hidden aspect-square bg-[#111111] border border-[#2a2a2a]">
                    <img
                      src={imgSrc(member.imageUrl, FALLBACK_IMG)}
                      alt={member.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Bio column */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <p className="custom-heading-four text-[#a38b41] text-lg mb-2">
                      Meet the Team
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {member.name}
                    </h1>
                    <p className="text-gray-300 text-lg">{member.title}</p>
                  </div>

                  {member.bio && (
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
                      <h2 className="text-white font-semibold mb-3">About</h2>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                        {member.bio}
                      </p>
                    </div>
                  )}

                  {member.linkedinUrl && (
                    <button
                      type="button"
                      onClick={() => openExternal(member.linkedinUrl)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0a66c2] hover:brightness-110 transition-all text-white font-semibold text-sm cursor-pointer"
                    >
                      <FaLinkedinIn />
                      View LinkedIn Profile
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
