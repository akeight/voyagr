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
