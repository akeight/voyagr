import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { TripIdea, BackendTripIdea } from "./types";

type TripContextValue = {
  tripIdeas: (TripIdea | BackendTripIdea)[];
  setTripIdeas: (ideas: (TripIdea | BackendTripIdea)[]) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
};

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripIdeas, setTripIdeas] = useState<(TripIdea | BackendTripIdea)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TripContext.Provider value={{ tripIdeas, setTripIdeas, isLoading, setIsLoading }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrips must be used within TripProvider");
  return ctx;
}
