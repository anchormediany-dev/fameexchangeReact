import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";

const Page = ({ title }) => (
  <div className="pt-28 p-4 min-h-screen bg-gray-100">
    <h1 className="text-3xl font-semibold text-center">{title}</h1>
  </div>
);

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Page title="Login Page" />} />
          <Route path="/signup" element={<Page title="Sign Up Page" />} />
          <Route path="/trading-chart" element={<Page title="Trading Chart Page" />} />
          <Route path="/videos" element={<Page title="Videos Page" />} />
          <Route path="/talent-tokens" element={<Page title="20 Top Talent Tokens Page" />} />
          <Route path="/nft" element={<Page title="NFT Page" />} />
          <Route path="/in-verse" element={<Page title="In Verse Page" />} />
          <Route path="/futured" element={<Page title="Futured Page" />} />
          <Route path="/faqs" element={<Page title="FAQ's Page" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
