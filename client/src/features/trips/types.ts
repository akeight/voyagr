import type { LucideIcon } from "lucide-react";

export type ItineraryItem = {
  day: number;
  activity: string;
  icon: LucideIcon;
};

export type TripIdea = {
  id: number;
  title: string;
  destination: string;
  duration: string;
  budget: number;
  theme: string;
  image: string;
  itinerary: ItineraryItem[];
};

// Backend data structure (what we actually receive from API)
export type BackendItineraryItem = {
  day: number;
  activity: string;
  icon_name: string;
};

export type BackendTripIdea = {
  id: number;
  title: string;
  destination: string;
  duration: string;
  budget: number;
  theme: string;
  image: string;
  itinerary: BackendItineraryItem[];
};
