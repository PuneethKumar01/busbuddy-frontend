"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamically load components (no SSR)
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
}

export default function MapView({ locations }: { locations: Location[] }) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number]>([12.8855, 74.8388]); // Mangaluru default

  useEffect(() => {
    setMounted(true);
    if (locations.length > 0) {
      setPosition([locations[0].latitude, locations[0].longitude]);
    }
  }, [locations]);

  if (!mounted) return <p>Loading map...</p>; // prevent SSR crash

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
      {locations.map((loc, i) => (
        <Marker key={i} position={[loc.latitude, loc.longitude]} />
      ))}
    </MapContainer>
  );
}
