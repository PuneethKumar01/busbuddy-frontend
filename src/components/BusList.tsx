import { Bus } from "../types";
import { useEffect, useState } from "react";

interface Props {
  buses: Bus[];
}

const BusList: React.FC<Props> = ({ buses }) => {
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (buses.length > 0) {
      setHasSearched(true);
    }
  }, [buses]);

  return (
    <div>
      {hasSearched && buses.length === 0 && <p>No buses found</p>}
      {buses.map((bus) => (
        <div key={bus._id}>
          <p>Bus Number: {bus.busNumber}</p>
          <p>Capacity: {bus.capacity}</p>
          <p>Route: {bus.route?.routeNumber}</p>
          <p>Driver: {bus.driver?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default BusList;
