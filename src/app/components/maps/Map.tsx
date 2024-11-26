import { GoogleMap, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";
import { useState } from "react";

const DynamicMap = ({ coordinates }: { coordinates: { lat: number; lng: number; role: string }[] }) => {
  const apiKey = "AIzaSyAJHnFPcb4muOFIQZ_7CNbn24le5cI8tXU"; // Replace with your actual API key
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; role: string } | null>(null);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        zoom={5}
        center={coordinates.length > 0 ? { lat: coordinates[0].lat, lng: coordinates[0].lng } : { lat: 28.7041, lng: 77.1025 }}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={{ lat: coord.lat, lng: coord.lng }}
            onClick={() => setSelectedMarker(coord)} // Set the selected marker on click
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} // Provide position for InfoWindow
            onCloseClick={() => setSelectedMarker(null)} // Close InfoWindow when clicked
          >
            <div>
              <p>Role: {selectedMarker.role}</p>
              <p>Latitude: {selectedMarker.lat}</p>
              <p>Longitude: {selectedMarker.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default DynamicMap;
