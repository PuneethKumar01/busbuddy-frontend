export interface Driver {
  _id: string;
  name: string;
  licenseNumber: string;
  phone: string;
}

export interface Route {
  _id: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  stops: string[];
}

export interface Bus {
  _id: string;
  busNumber: string;
  capacity: number;
  driver?: Driver;
  route?: Route;
  currentLocation?: Location;
}

export interface Location {
  _id: string;
  bus?: Bus;
  latitude: number;
  longitude: number;
}
