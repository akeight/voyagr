import { Mountain, Plane, Pizza, Landmark, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map icon names to icon components
const iconMap: Record<string, LucideIcon> = {
  Mountain,
  Plane,
  Pizza,
  Landmark,
  Sun,
};

export default function ItineraryIcon({ icon }: { icon: LucideIcon | string }) {
  if (typeof icon === "string") {
    const IconComponent = iconMap[icon] || Plane; // Default to Plane if icon not found
    return <IconComponent className="w-6 h-6 text-teal-400" />;
  }
  
  const IconComponent = icon;
  return <IconComponent className="w-6 h-6 text-teal-400" />;
}
