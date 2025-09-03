import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import { useTrips } from "../../features/trips/context";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoading } = useTrips();

  return (
    <div className="bg-gray-900 font-sans min-h-screen">
      <header className="bg-gray-900/80 backdrop-blur-sm text-white p-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-teal-400" />
            <span className="text-xl font-bold">Voyagr</span>
          </Link>
          <nav>
            <Link
              to="/generate"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Plan a Trip
            </Link>
          </nav>
        </div>
      </header>
      <main className="pt-16 w-full">{children}</main>
      <footer className="bg-gray-900 border-t border-gray-800 text-white text-center p-6">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Voayagr. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-1">Crafting memorable journeys with the power of AI.</p>
        </div>
      </footer>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
