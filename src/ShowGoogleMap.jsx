// maps api tutorial: https://www.youtube.com/watch?v=iP3DnhCUIsE
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// useJsApiLoader = hook from maps
import { API_KEY } from "./constants";
const center = { lat: 33.33333, lng: 2.4444 };
const containerStyle = { height: "100%", width: "100%" };
function ShowGooleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  if (!isLoaded) {
    return <div>loading...</div>;
  }
  return (
    <div style={{ height: "50vh", width: "70vw", border: "2px solid black" }}>
      {/* below component from import */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      ></GoogleMap>
    </div>
  );
}

export default ShowGooleMap;
