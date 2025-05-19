import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import siteLogo from "../assets/images/site-logo.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white w-full py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img src={siteLogo} alt="Fame Exchange Logo" className="mr-2" />
            </div>
            <p className="text-xs text-center md:text-left">
              Fan Engagement with Real Benefits. Fans are not just spectators
              but active participants. Beyond intrinsic value, "THE FAME
              EXCHANGE" allows Fans to actively support their favorite Talent,
              offering tangible benefits that go beyond the virtual realm.
            </p>
            <div>
              <button className="bg-[#aa883e] text-black font-bold py-2 px-6 mt-2">
                GET STARTED
              </button>
            </div>
          </div>

          {/* Company and Services Columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg  font-bold mb-4 text-[#f2f2f2]">
                COMPANY
              </h3>
              <ul className="space-y-2">
                <li>List Information</li>
                <li>List Information</li>
                <li>List Information</li>
                <li>List Information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#f2f2f2]">
                SERVICES
              </h3>
              <ul className="space-y-2">
                <li>List Information</li>
                <li>List Information</li>
                <li>List Information</li>
                <li>List Information</li>
                <li>List Information</li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#f2f2f2]">
              NEWSLETTER
            </h3>
            <p className="text-sm mb-4">
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
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <div>COPYRIGHT 2024 ALL RIGHTS RESERVED PRIVACY</div>
          <div>POLICY/ TERMS & CONDITIONS</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
