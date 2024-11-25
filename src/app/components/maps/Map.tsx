"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapProps {
  coordinates: Coordinate[];
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJHnFPcb4muOFIQZ_7CNbn24le5cI8tXU", // Direct API key
  });

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  const mapCenter = coordinates.length > 0 ? { lat: coordinates[0].lat, lng: coordinates[0].lng } : { lat: 0, lng: 0 };

  return (
    <GoogleMap
      center={mapCenter}
      zoom={10}
      mapContainerStyle={{
        width: "100%",
        height: "500px",
      }}
    >
      {coordinates.map((coord, index) => (
        <Marker key={index} position={{ lat: coord.lat, lng: coord.lng }} />
      ))}
    </GoogleMap>
  );
};

export default Map;
