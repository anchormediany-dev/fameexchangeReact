import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center text-center px-4">
      <div className="space-y-6">
        <p className="text-[#F3BA18] text-sm uppercase tracking-widest font-semibold">404</p>
        <h1 className="text-white text-3xl font-bold">Page not found</h1>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block custom-button-two px-8 py-3 rounded-lg font-semibold text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
