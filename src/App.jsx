import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";

const Page = ({ title }) => (
  <div className="pt-28 p-4 min-h-screen bg-gray-100">
    <h1 className="text-3xl font-semibold text-center">{title}</h1>
  </div>
);

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Page title="Login Page" />} />
        <Route path="/signup" element={<Page title="Sign Up Page" />} />
      </Routes>
   <div className="absolute bottom-0 left-0 w-full"> <Footer/></div>
    </>
  );
}
