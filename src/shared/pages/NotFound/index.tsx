import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#1c2632] p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-xl font-semibold">React Showcase</h1>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 text-red-500 text-6xl">⚠️</div>
              <h2 className="text-2xl font-semibold">404 - Page Not Found</h2>
            </div>
            <p className="text-gray-600 mt-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="block mt-6">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
