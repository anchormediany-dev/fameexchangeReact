import { FaApple, FaGooglePlay } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";

// Android's Play Store URL is deterministic from the applicationId set in
// android/app/build.gradle (com.fameexchange.app) — correct and permanent
// the moment the app is actually published, no code change needed then.
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.fameexchange.app";

// iOS only gets a real numeric App ID once the app is first submitted in
// App Store Connect — that hasn't happened yet. Replace this the moment
// it does; everything else on this page is already correct.
const IOS_URL = "https://apps.apple.com/app/the-fame-exchange";

function StoreCard({ platform, Icon, url, badgeLabel }) {
  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[#1f1f1f] flex items-center justify-center">
        <Icon className="text-3xl text-[#F3BA18]" />
      </div>
      <h2 className="text-white text-xl font-bold">{platform}</h2>
      <p className="text-gray-400 text-sm">
        Scan the QR code with your phone's camera to open the {badgeLabel}.
      </p>
      <div className="bg-white p-4 rounded-xl">
        <QRCodeCanvas value={url} size={180} level="M" />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="custom-button-two px-6 py-2.5 rounded-lg font-semibold text-sm mt-2"
      >
        {badgeLabel}
      </a>
    </div>
  );
}

export default function DownloadAppPage() {
  return (
    <MotionPageWrapper>
      <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        <main className="flex-grow pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Get The Fame Exchange App
              </h1>
              <p className="text-gray-400">
                Available for iOS and Android. Scan a code below on your
                phone, or tap the button to open the store directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <StoreCard
                platform="iOS"
                Icon={FaApple}
                url={IOS_URL}
                badgeLabel="Download on the App Store"
              />
              <StoreCard
                platform="Android"
                Icon={FaGooglePlay}
                url={ANDROID_URL}
                badgeLabel="Get it on Google Play"
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
