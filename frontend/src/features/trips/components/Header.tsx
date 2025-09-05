import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import '@awesome.me/webawesome/dist/components/button/button.js';

export default function Header() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm text-white p-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-teal-400" />
            <span className="text-xl font-bold">Voyagr</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/generate"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Plan a Trip
            </Link>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>
  );
}