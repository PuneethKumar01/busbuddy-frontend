import { Bus } from "../types";
import { useEffect, useState } from "react";

interface Props {
  buses: Bus[];
}

const BusList: React.FC<Props> = ({ buses }) => {
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (buses.length > 0 || hasSearched) setHasSearched(true);
  }, [buses, hasSearched]);

  return (
    <div>
      {hasSearched && buses.length === 0 && <p>No buses found</p>}
      {buses.map((bus) => (
        <div key={bus._id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
          <p><strong>Bus Number:</strong> {bus.busNumber}</p>
          <p><strong>Capacity:</strong> {bus.capacity}</p>
          <p><strong>Route:</strong> {bus.route?.routeNumber || "—"}</p>
          <p><strong>Driver:</strong> {bus.driver?.name || "—"}</p>
        </div>
      ))}
    </div>
  );
};

export default BusList;
