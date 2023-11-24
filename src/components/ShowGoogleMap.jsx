import { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// useJsApiLoader = hook from maps
import { API_KEY } from "../constants";

const center = { lat: 53.33333, lng: 2.4444 };
const containerStyle = { height: "100%", width: "100%" };
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
    // if <GoogleMap/> component
    if (mapRef.current) {
      const newPosition = { lat: 53.33333, lng: 12.6444 };
      setPhotoMarker(newPosition);
    }
  };

  return (
    <div style={{ height: "50vh", width: "70vw", border: "2px solid black" }}>
      {/* below GoogleMap component from import */}
      <GoogleMap
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
        {/* icon={pinImage} >> custom icon for marker on maps 
        // const pinImage = "../src/assets/location-pin.png";*/}
        {photoMarker && <Marker position={photoMarker} />}
      </GoogleMap>
      <button className="btn" onClick={addPhotoMarker}>
        Pokaż pinezkę
      </button>
    </div>
  );
}

export default ShowGooleMap;
