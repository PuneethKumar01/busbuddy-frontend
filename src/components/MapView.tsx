"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false }
);
const TileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  { ssr: false }
);
const Marker = dynamic(
  async () => (await import("react-leaflet")).Marker,
  { ssr: false }
);

interface Location {
  latitude: number;
  longitude: number;
  busNo?: string;
}

export default function MapView({ locations }: { locations: Location[] }) {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  // Default center (Mangaluru)
  const [position, setPosition] = useState<[number, number]>([12.8855, 74.8388]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const leaflet = require("leaflet");
      setL(leaflet);
    }
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      setPosition([locations[0].latitude, locations[0].longitude]);
    }
  }, [locations]);

  if (!mounted) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ✅ Only render markers if Leaflet is ready */}
      {L &&
        locations.length > 0 &&
        locations.map((loc, i) => {
          const customIcon = L.divIcon({
            className: "custom-marker",
            html: `
              <div style="
                display: flex; 
                flex-direction: column; 
                align-items: center;
              ">
                <span style="
                  background: white; 
                  color: black; 
                  font-size: 14px; 
                  font-weight: bold; 
                  padding: 3px 8px; 
                  border-radius: 6px;
                  margin-bottom: 4px;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                ">
                  ${loc.busNo || ""}
                </span>
                <div style="
                  width: 22px; 
                  height: 22px; 
                  background: blue; 
                  border-radius: 50%;
                  border: 2px solid white;
                  box-shadow: 0 0 6px rgba(0,0,0,0.4);
                "></div>
              </div>
            `,
            iconAnchor: [15, 30],
          });

          return (
            <Marker
              key={i}
              position={[loc.latitude, loc.longitude]}
              icon={customIcon}
            />
          );
        })}
    </MapContainer>
  );
}
