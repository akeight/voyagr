import type { ReactNode } from "react";
import Header from "../../features/trips/components/Header";
import LoadingSpinner from "../LoadingSpinner";
import { useTrips } from "../../features/trips/context";
import Footer from "../../features/trips/components/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoading } = useTrips();

  return (
    <div className="bg-gray-900 font-sans min-h-screen">
      <Header />
      <main className="pt-16 w-full">{children}</main>
      <Footer />
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
