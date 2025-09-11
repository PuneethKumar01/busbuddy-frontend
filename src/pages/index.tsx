import { useState, useEffect } from "react";
import API from "../api/api";
import SearchForm from "../components/SearchForm";
import BusList from "../components/BusList";
import MapView from "../components/MapView";
import { Bus, Location } from "../types";

const Home: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const handleSearch = async (from: string, to: string) => {
    try {
      const res = await API.get(`/route/search-between?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      setBuses(res.data.buses || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Poll live bus locations every 5 seconds
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get("/location/latest");
        // transform server aggregate shape to Location[] with busNo if available
        const data = res.data.map((item: any) => ({
          _id: item._id,
          bus: item.bus || item.bus?._id,
          latitude: item.latitude,
          longitude: item.longitude,
          timestamp: item.timestamp,
          busNo: item.bus?.busNumber || (item.busNumber || ""),
        }));
        setLocations(data);
      } catch (err) {
        console.error("Location fetch error:", err);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>BusBuddy</h1>
      <SearchForm onSearch={handleSearch} />
      <BusList buses={buses} />
      <MapView locations={locations} />
    </div>
  );
};

export default Home;
