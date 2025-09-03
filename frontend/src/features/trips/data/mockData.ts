import { Plane, Sun, Mountain, Pizza, Landmark } from "lucide-react";
import type { TripIdea } from "../types";

export const mockTripIdeas: TripIdea[] = [
  {
    id: 1,
    title: "Weekend in the Mountains",
    destination: "Asheville, North Carolina",
    duration: "3 Days",
    budget: 800,
    theme: "Nature",
    image: "https://placehold.co/600x400/34d399/ffffff?text=Mountain+Getaway",
    itinerary: [
      { day: 1, activity: "Arrive, check into a cozy cabin. Hike a portion of the Appalachian Trail.", icon: Mountain },
      { day: 2, activity: "Explore downtown Asheville's breweries and art scene.", icon: Pizza },
      { day: 3, activity: "Drive the scenic Blue Ridge Parkway before heading home.", icon: Plane },
    ]
  },
  {
    id: 2,
    title: "Historic City Exploration",
    destination: "Charleston, South Carolina",
    duration: "4 Days",
    budget: 1200,
    theme: "History",
    image: "https://placehold.co/600x400/fbbf24/ffffff?text=Historic+Charleston",
    itinerary: [
      { day: 1, activity: "Arrive and explore the historic French Quarter.", icon: Landmark },
      { day: 2, activity: "Visit Fort Sumter and the Battery.", icon: Landmark },
      { day: 3, activity: "Carriage ride through the city and explore the City Market.", icon: Landmark },
      { day: 4, activity: "Enjoy a final southern brunch before departure.", icon: Pizza },
    ]
  },
  {
    id: 3,
    title: "Sunny Beach Escape",
    destination: "Clearwater, Florida",
    duration: "5 Days",
    budget: 1500,
    theme: "Beach",
    image: "https://placehold.co/600x400/60a5fa/ffffff?text=Beach+Vacation",
    itinerary: [
      { day: 1, activity: "Fly in, check into your beachfront hotel, and relax on the sand.", icon: Sun },
      { day: 2, activity: "Dolphin-watching tour and visit the Clearwater Marine Aquarium.", icon: Sun },
      { day: 3, activity: "Day trip to Caladesi Island State Park.", icon: Sun },
      { day: 4, activity: "Enjoy water sports like jet skiing or paddleboarding.", icon: Sun },
      { day: 5, activity: "Last morning swim before you fly out.", icon: Plane },
    ]
  }
];
