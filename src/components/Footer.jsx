import { motion } from "framer-motion";
import {
  FaGlobe,
  FaQuestionCircle,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import coinLogo from "../assets/images/coin-logo.png";
import googlePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/app-store.png";
import anchorMediaLlc from "../assets/images/anchor-media-llc.png";
import LanguageIcon from "../assets/icons/language.svg?react";
import HelpIcon from "../assets/icons/help-support.svg?react";
import YoutubeIcon from "../assets/icons/youtube.svg?react";
import TiktokIcon from "../assets/icons/tiktok.svg?react";
import RedditIcon from "../assets/icons/reddit.svg?react";
import InstagramIcon from "../assets/icons/instagram.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import DiscordIcon from "../assets/icons/discord.svg?react";
import SnapchatIcon from "../assets/icons/snapchat.svg?react";
import TelegramIcon from "../assets/icons/telegram.svg?react";
const Footer = () => {
  return (
    <footer className="bg-black text-white w-full px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8"
      >
        {/* Left Block */}
        <div className="space-y-4">
          <img src={coinLogo} alt="Coin Logo" className="h-auto w-full" />
          <div className="flex items-center gap-2 text-sm">
            <LanguageIcon /> US (International) / English
          </div>
          <div className="flex items-center gap-2 text-sm">
            <HelpIcon /> Help & Support
          </div>
         
        </div>

        {/* Corporate */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Corporate</h3>
          <p className="text-sm leading-6">
            The Fame Exchange / Famecoin
            <br />
            825 East Gate Blvd
            <br />
            Suite 202
            <br />
            Garden City, NY 11530
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">About</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-yellow-400">How To Buy/Sell</a></li>
            <li><a href="#" className="hover:text-yellow-400">About Crypt</a></li>
            <li><a href="#" className="hover:text-yellow-400">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
          </ul>
        </div>

        {/* Terms */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Terms</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400">Anti-Money Laundering</a></li>
            <li><a href="#" className="hover:text-yellow-400">Terms And Conditions</a></li>
          </ul>
        </div>

        {/* Apps */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Apps</h3>
          <div className="flex flex-col gap-2">
            <img src={appStore} alt="App Store" className="h-10 w-auto" />
            <img src={googlePlay} alt="Google Play" className="h-10 w-auto" />
          </div>
        </div>
      </motion.div>
     <div className="flex items-end"> 
      <div className="grid grid-cols-5 gap-x-10 gap-y-5 text-xl mt-16">

            <YoutubeIcon className="hover:scale-105 transition" />
            <TiktokIcon className="hover:scale-105 transition" />
            <RedditIcon className="hover:scale-105 transition" />
            <InstagramIcon className="hover:scale-105-white transition" />
            <LinkedinIcon className="hover:scale-105 transition" />
            <XIcon className="hover:scale-105 transition" />
            <DiscordIcon className="hover:scale-105 transition" />
            <SnapchatIcon className="hover:scale-105 transition" />
            <TelegramIcon className="hover:scale-105 transition" />
    
          </div>
          <div className="flex w-full justify-center">
            <img src={anchorMediaLlc} className="h-[85px] w-[290px]" alt="Anchor Media LLC" /></div>
            </div>
           
      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-center text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 gap-2">
         <p>All Rights Reserved, Copyright 2021</p>
         <p className="uppercase">tHE fAME EXCHANGE, POWERED BY: FAMECOIN</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
