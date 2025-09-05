import type { ReactNode } from "react";
import Header from "../../features/trips/components/Header";
import LoadingSpinner from "../LoadingSpinner";
import { useTrips } from "../../features/trips/context";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoading } = useTrips();

  return (
    <div className="bg-gray-900 font-sans min-h-screen">
      <Header />
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
