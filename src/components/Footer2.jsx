import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
import googlePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-black   text-white w-full">
      <div className=" z-10 space-y-8 container  py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5  gap-8">
          {/* Left Block */}
          <div className="space-y-4">
            {/* Logo Row */}
            <div className="flex items-start">
              <img
                src={siteLogo}
                alt="Coin Logo"
                className=" bottom-3 right-10 h-auto"
              />
            </div>

            <p className="footer_paragraph text-center text-[#81a2b8]">
              Fan Engagement with Real Benefits: Fans are not just spectators
              but active participants. Beyond intrinsic value. "THE FAME
              EXCHANGE" allows Fans to actively support their favorite Talent,
              offering tangible g benefits that go beyond the virtual realm.
            </p>
            <div className="flex justify-center">
              <button className="bg-[#a38b41] hover:bg-[#a38a41d0] font-medium text-black py-3 px-6 mt-2">
                GET STARTED
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className=" footer_nav_title mb-5 text-[#f2f2f2]">SERVICES</h3>
            <ul className="space-y-2 footer_nav_link">
              <li>
                <Link to="/how-to-buy-sell" className="hover:text-primary ">
                  How To Buy/Sell
                </Link>
              </li>
              <li>
                <Link to="/about-crypto" className="hover:text-primary">
                  About Crypt
                </Link>
              </li>
              <li>
                <Link
                  to="/anti-money-laundering"
                  className="hover:text-primary"
                >
                  Anti-Money Laundering
                </Link>
              </li>
            </ul>
          </div>
          {/* About */}
          <div>
            <h3 className=" footer_nav_title mb-5 text-[#f2f2f2]">ABOUT</h3>
            <ul className="space-y-2 footer_nav_link">
              <li>
                <Link to="/how-to-buy-sell" className="hover:text-primary ">
                  How To Buy/Sell
                </Link>
              </li>
              <li>
                <Link to="/about-crypto" className="hover:text-primary">
                  About Crypt
                </Link>
              </li>
              <li>
                <Link
                  to="/anti-money-laundering"
                  className="hover:text-primary"
                >
                  Anti-Money Laundering
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="footer_nav_title text-[#f2f2f2] mb-5 ">APPS</h3>
            <div className="flex flex-col gap-8">
              <img
                src={appStore}
                alt="App Store"
                className="object-cover max-w-48 cursor-pointer"
              />
              <img
                src={googlePlay}
                alt="Google Play"
                className="object-cover max-w-48 cursor-pointer"
              />
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="footer_nav_title text-[#f2f2f2] mb-5">NEWSLETTER</h3>
            <p className="footer_paragraph mb-4 text-[#bfbfbf]">
              Sign up today for tips and the latest news and information
            </p>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full p-2 bg-transparent border-b border-white outline-none"
            />
            <div className="flex space-x-4 mt-8 justify-center md:justify-start">
              <FaFacebookF size={20} />
              <FaTwitter size={20} />
              <FaInstagram size={20} />
              <FaYoutube size={20} />
            </div>
          </div>
          {/* </div> */}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-4  text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="footer_copyright">
              COPYRIGHT 2024 ALL RIGHTS RESERVED PRIVACY
            </p>
            <p className="footer_copyright">
              <Link
                className="hover:underline hover:text-primary"
                to="/privacy-policy"
              >
                POLICY
              </Link>
              /{" "}
              <Link
                className="hover:underline hover:text-primary"
                to="/terms-conditions"
              >
                TERMS & CONDITIONS
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
