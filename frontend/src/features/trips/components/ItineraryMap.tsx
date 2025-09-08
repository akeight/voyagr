import { useEffect, useRef } from "react";
import { MAPS_ENABLED, MAPBOX_TOKEN } from "../../../config";
import 'mapbox-gl/dist/mapbox-gl.css';


export type Activity = {
  title: string;
  address?: string;
  lat?: number;
  lon?: number;
  date?: string;    // optional: tag which day
};

type Props = { activities: Activity[] };

export function MapSection({ activities }: Props) {
  if (!MAPS_ENABLED) {
    return (
      <div className="h-96 w-full rounded-xl bg-muted/30 grid place-items-center text-sm">
        Map coming soon
      </div>
    );
  }
  return <ItineraryMap activities={activities} />;
}

function ItineraryMap({ activities }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: any; // avoid importing types when disabled
    let cleanup = () => {};

    async function boot() {
      // lazy-load so bundle stays small when maps are off
      const mapboxgl = (await import("mapbox-gl")).default;
      if (!MAPBOX_TOKEN) return;
      mapboxgl.accessToken = MAPBOX_TOKEN;

      if (!ref.current) return;
      map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-122.333, 47.608],
        zoom: 11
      });

      const bounds = new mapboxgl.LngLatBounds();
      activities
        .filter(a => typeof a.lat === "number" && typeof a.lon === "number")
        .forEach(a => {
          new mapboxgl.Marker()
            .setLngLat([a.lon!, a.lat!])
            .setPopup(new mapboxgl.Popup().setText(a.title))
            .addTo(map);
          bounds.extend([a.lon!, a.lat!]);
        });

      if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 40, duration: 0 });
      cleanup = () => map.remove();
    }

    boot();
    return () => cleanup();
  }, [activities]);

  return <div ref={ref} className="h-96 w-full rounded-xl" />;
}
