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

export interface Location {
  _id?: string;
  bus?: Bus; // 🔧 replaced `any` with Bus
  latitude: number;
  longitude: number;
  timestamp?: string;
  // optional busNo for frontend display
  busNo?: string;
}

export interface Bus {
  _id: string;
  busNumber: string;
  capacity: number;
  driver?: Driver;
  route?: Route;
  currentLocation?: Location;
}

export interface LocationResponse {
  _id: string;
  bus?: {
    _id: string;
    busNumber?: string;
    route?: {
      _id: string;
      startLocation: string;
      endLocation: string;
    };
  } | null;
  latitude: number;
  longitude: number;
  timestamp: string;
  busNumber?: string;
}
