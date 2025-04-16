import { motion } from "framer-motion";
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
    <footer className="bg-black text-white w-full">
      <div className="container relative z-10 space-y-8 py-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
        >
          {/* Left Block */}
          <div className="space-y-4">
            {/* Logo Row */}
            <div className="flex items-start">
              <img
                src={coinLogo}
                alt="Coin Logo"
                className="max-w-[220px] relative bottom-3 right-10 h-auto"
              />
            </div>

            {/* Text Items */}
            <div className="flex items-center gap-8 text-sm">
              <LanguageIcon /> <p>US (International) / English</p>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <HelpIcon /> <p>Help & Support</p>
            </div>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="text-primary font-semibold text-p3 mb-5">
              Corporate
            </h3>
            <div className="text-sm leading-6">
              <p className="mb-2"> The Fame Exchange / Famecoin</p>

              <p>
                {" "}
                825 East Gate Blvd
                <br />
                Suite 202
                <br />
                Garden City, NY 11530
              </p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-primary text-p3 font-semibold mb-5">About</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-primary ">
                  How To Buy/Sell
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  About Crypt
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h3 className="text-primary font-semibold  text-p3 mb-5">Terms</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Anti-Money Laundering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Terms And Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-primary font-semibold mb-5 text-p3">Apps</h3>
            <div className="flex flex-col gap-8">
              <img src={appStore} alt="App Store" className="object-cover" />
              <img
                src={googlePlay}
                alt="Google Play"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
        <div className="flex md:flex-row flex-col items-end">
          <div className="grid grid-cols-5 gap-x-10 gap-y-5 text-xl md:mb-0 mb-5 mt-16">
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
          <div className="flex w-full justify-start md:justify-center">
            <img
              src={anchorMediaLlc}
              className="h-[85px] w-[290px]"
              alt="Anchor Media LLC"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 gap-2">
            <p>All Rights Reserved, Copyright 2021</p>
            <p className="uppercase">tHE fAME EXCHANGE, POWERED BY: FAMECOIN</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
