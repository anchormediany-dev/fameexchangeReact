import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MotionPageWrapper from "../components/MotionPageWrapper";
import SocialConnectionsPanel from "../components/SocialConnectionsPanel";
import siteLogo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";

export default function ConnectSocials() {
  const navigate = useNavigate();
  const user = useSelector((s) => s?.auth?.user);

  const handleContinue = () => {
    if (user?.role === "TALENT") navigate("/networth-calculator");
    else navigate("/");
  };

  return (
    <MotionPageWrapper>
      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 relative bg-[#171717] min-h-screen">
        <div className="w-full container flex flex-col-reverse lg:flex-row gap-8 z-10">
          {/* Left: panel */}
          <div className="lg:w-[70%]">
            {/* Step header */}
            <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border border-[#333] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[#F3BA18] text-xs uppercase tracking-widest font-semibold">
                  Step 4 of 4 — Optional
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold">
                Connect Your Social Accounts
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Log in to each platform to prove ownership and pull your real
                follower count. Your&nbsp;
                <span className="text-[#F3BA18] font-medium">social worth</span>
                &nbsp;= total followers across connected platforms — used for
                talent trading. You can skip this now and connect later from
                your profile.
              </p>
            </div>

            <SocialConnectionsPanel returnTo="connect-socials" />

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="text-white/50 text-sm hover:text-white/70 transition"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className="custom-button-two px-10 py-3 rounded-lg font-semibold text-sm"
              >
                Continue →
              </button>
            </div>
          </div>

          {/* Right: branding */}
          <div className="lg:w-[30%] flex lg:flex-col flex-row items-center lg:items-start text-white space-y-6 pt-6">
            <Link className="w-full lg:block hidden" to="/">
              <img src={siteLogo} alt="Logo" />
            </Link>
            <div className="flex flex-col">
              <h1 className="mt-5">
                <span className="custom-heading-seven ml-5">WELCOME TO</span>
                <span className="text-xl ml-5"> THE FAME EXCHANGE</span>
              </h1>
              <p className="text-white/80 text-xs ml-5 mt-1">
                Verify your social presence and set your worth before you start
                trading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
}
