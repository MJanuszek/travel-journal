import "../styles/maps.css";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// useJsApiLoader = hook from maps
import { API_KEY } from "../constants";

// let photoClicked = img;

const containerStyle = {
  height: "100%",
  width: "100%",
  border: "3px solid black",
};

const ShowGooleMap = (props) => {
  const isClicked = props.isClicked;
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState({ lat: 53.33333, lng: 2.4444 });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });
  // todo: pass direction (lat and lng) from clicked photo
  const addPhotoMarker = (props) => {
    const { latitude, longitude } = props.coordinates;
    console.log("photo klicked", props, latitude, longitude);
    // if <GoogleMap/> component
    if (mapRef.current) {
      const newPosition = {
        lat: latitude,
        lng: longitude,
      };
      setPhotoMarker(newPosition);

      if (isClicked) {
        setCenter({ lat: latitude, lng: longitude });
        setZoom(16);
      } else {
        setZoom(2);
      }
    }
  };
  useEffect(() => {
    addPhotoMarker(props);
  }, [props]);
  const mapRef = useRef(null);
  const [photoMarker, setPhotoMarker] = useState(null);

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="maps-wrapper">
      <div className="maps-style" style={{ height: "50vh", width: "70vw" }}>
        {/* below GoogleMap component from import */}
        <GoogleMap
          className="maps-style"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
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
};

export default ShowGooleMap;
