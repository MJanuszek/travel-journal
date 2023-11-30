import "../styles/maps.css";
import { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// useJsApiLoader = hook from maps
import { API_KEY } from "../constants";

let photoClicked = img;

const center = { lat: 53.33333, lng: 2.4444 };
const containerStyle = {
  height: "100%",
  width: "100%",
  border: "3px solid black",
};
function ShowGooleMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  const mapRef = useRef(null);
  const [photoMarker, setPhotoMarker] = useState(null);

  if (!isLoaded) {
    return <div>loading...</div>;
  }
  // todo: pass direction (lat and lng) from clicked photo
  const addPhotoMarker = () => {
    console.log("photo klicked");
    // if <GoogleMap/> component
    if (mapRef.current) {
      const newPosition = { lat: 53.33333, lng: 12.6444 };
      setPhotoMarker(newPosition);
    }
  };
  return (
    <div className="maps-wrapper">
      <div className="maps-style" style={{ height: "50vh", width: "70vw" }}>
        {/* below GoogleMap component from import */}
        <GoogleMap
          className="maps-style"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
          // onLoad (map) === <GoogleMap/> component (returns itself)
          onLoad={(map) => (mapRef.current = map)}
        >
          {photoMarker && <Marker position={photoMarker} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default ShowGooleMap;
