import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-[#0b0b0b] rounded-xl shadow-xl p-8 text-center flex flex-col items-center justify-center">
      {/* Spinner */}
      <FaSpinner className="text-4xl text-gray-800 dark:text-white animate-spin mb-4" />

      {/* Loading Text */}
      <h2 className="text-red-600 font-bold text-lg tracking-wider uppercase mb-3">
        Loading...
      </h2>

      {/* Status Message */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        "Be Patient"
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        You are currently being evaluated by{" "}
        <span className="font-semibold">The Fame Exchange</span>.
        <br />
        Your status and calculated value has been sent to your email.
        <br />
        Thank you!
      </p>
    </div>
  );
};

export default Loader;
