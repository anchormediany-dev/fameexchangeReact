import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFeaturedTalentQuery } from "../app/authApi";
import { imgSrc } from "../utils/imgSrc";
import { handleImageError } from "../utils/imagePlaceholder";

const FeaturedTalentSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const { data, isLoading } = useGetFeaturedTalentQuery();

  const talent = data?.data;

  // Nothing to show — render nothing at all, not an empty section.
  if (isLoading || !talent) return null;

  const isTradeable = talent.tier === "tradeable";
  const displayName = talent.profile?.name || talent.profile?.full_name || talent.name;

  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] text-white py-16 lg:py-20 2xl:py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden"
    >
      <div className="relative z-10 container mx-auto grid lg:grid-cols-2 items-center gap-10 lg:gap-12 xl:gap-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden order-1 lg:order-1 aspect-square max-h-[420px] mx-auto lg:mx-0 w-full"
        >
          <img
            src={imgSrc(talent.image)}
            alt={displayName}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="order-2 lg:order-2 space-y-5"
        >
          <p className="text-center lg:text-left custom-heading-four text-[#a38b41] text-lg sm:text-xl">
            Featured Talent
          </p>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {displayName}
          </h3>

          {isTradeable ? (
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              {talent.fame_score != null && (
                <span className="bg-[#2a2a2a] px-3 py-1.5 rounded-lg">
                  FameScore <span className="text-[#F3BA18] font-semibold">{talent.fame_score}</span>
                </span>
              )}
              {talent.current_price != null && (
                <span className="bg-[#2a2a2a] px-3 py-1.5 rounded-lg">
                  Share Price{" "}
                  <span className="text-[#F3BA18] font-semibold">
                    ${Number(talent.current_price).toFixed(2)}
                  </span>
                </span>
              )}
            </div>
          ) : (
            <span className="inline-block bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-bold px-3 py-1.5 rounded-full">
              🎓 Graduating Soon
            </span>
          )}

          {talent.description && (
            <p className="text-gray-400 leading-relaxed line-clamp-3">
              {talent.description}
            </p>
          )}

          <motion.button
            type="button"
            onClick={() => navigate("/featured-talent")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="custom-button-two px-6 py-3 rounded-lg font-semibold text-sm"
          >
            View Full Bio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTalentSection;
