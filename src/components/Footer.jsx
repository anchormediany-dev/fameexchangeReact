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
    <footer className="bg-black absolute bottom-0 left-0 right-0 text-white w-full">
      <div className="container relative z-10 space-y-8 py-12">
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
            <div className="md:flex hidden items-start">
              <img
                src={coinLogo}
                alt="Coin Logo"
                className="max-w-[220px] relative bottom-3 right-10 h-auto"
              />
            </div>

            {/* Text Items */}
            <button className="flex cursor-pointer items-center gap-3 lg:gap-8 text-sm">
              <LanguageIcon /> <p>US (International) / English</p>
            </button>
            <button className="flex cursor-pointer items-center  gap-3 lg:gap-8  text-sm">
              <HelpIcon /> <p>Help & Support</p>
            </button>
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
        </motion.div>
        <div className="flex md:flex-row flex-col md:items-end">
          <div className="grid grid-cols-5 max-w-[70%] sm:max-w-[50%] md:w-auto gap-x-10 gap-y-5 text-xl md:mb-0 mb-5 ">
            <YoutubeIcon className="hover:scale-105 transition cursor-pointer" />
            <TiktokIcon className="hover:scale-105 transition cursor-pointer" />
            <RedditIcon className="hover:scale-105 transition cursor-pointer" />
            <InstagramIcon className="hover:scale-105-white transition cursor-pointer" />
            <LinkedinIcon className="hover:scale-105 transition cursor-pointer" />
            <XIcon className="hover:scale-105 transition cursor-pointer" />
            <DiscordIcon className="hover:scale-105 transition cursor-pointer" />
            <SnapchatIcon className="hover:scale-105 transition cursor-pointer" />
            <TelegramIcon className="hover:scale-105 transition cursor-pointer" />
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
          <div className="flex flex-col md:flex-row justify-between items-center   gap-2">
            <p>All Rights Reserved, Copyright 2021</p>
            <p className="uppercase">tHE fAME EXCHANGE, POWERED BY: FAMECOIN</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
