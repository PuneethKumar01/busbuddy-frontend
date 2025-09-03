import { useState } from "react";
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
      const res = await API.get(`/route/search?from=${from}&to=${to}`);
      setBuses(res.data.buses);
      setLocations(res.data.buses.map((bus: Bus) => bus.currentLocation).filter(Boolean));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>BusBuddy</h1>
      <SearchForm onSearch={handleSearch} />
      <BusList buses={buses} />
      <MapView locations={locations} />
    </div>
  );
};

export default Home;
