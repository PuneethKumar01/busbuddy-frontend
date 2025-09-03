import type { AppProps } from "next/app";
import "leaflet/dist/leaflet.css";   // ✅ must be at the very top
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
