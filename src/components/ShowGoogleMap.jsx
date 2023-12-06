import "../styles/journal.scss";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// useJsApiLoader = hook from maps
import { API_KEY } from "../constants";

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
  // SCROLL PAGE TO MAPS:::
  function scrollToMaps() {
    //  position of Maps on page
    const mapElement = mapRef.current.getDiv();
    const rect = mapElement.getBoundingClientRect();
    // Scroll to component
    window.scrollTo({
      top: window.scrollY + rect.top + (rect.height - window.innerHeight) / 2,
      behavior: "smooth",
    });
  }

  const addPhotoMarker = (props) => {
    const { latitude, longitude } = props.coordinates;
    // if <GoogleMap/> component:::
    if (mapRef.current) {
      const newPosition = {
        lat: latitude,
        lng: longitude,
      };
      setPhotoMarker(newPosition);

      if (isClicked) {
        setCenter({ lat: latitude, lng: longitude });
        setZoom(12);
      } else {
        setZoom(2);
      }

      scrollToMaps();
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
      <div className="maps-style" style={{ height: "30vh", width: "30vw" }}>
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
