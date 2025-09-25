// pages/Unauthorized.jsx
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
   <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20 flex  justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Access Denied
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          You don't have permission to access this page.
        </p>
        <Link to="/" className="custom-button-two">
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default Unauthorized;
