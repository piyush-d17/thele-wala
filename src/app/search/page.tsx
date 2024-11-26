"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScriptNext } from "@react-google-maps/api";

interface User {
  location?: {
    latitude?: string;
    longitude?: string;
  };
  role?: string;
}



const DynamicMap = ({ coordinates }: { coordinates: { lat: number; lng: number; role: string }[] }) => {
  const apiKey = "AIzaSyAJHnFPcb4muOFIQZ_7CNbn24le5cI8tXU"; // Replace with your actual Google Maps API key
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; role: string } | null>(null);

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        zoom={5}
        center={coordinates.length > 0 ? { lat: coordinates[0].lat, lng: coordinates[0].lng } : { lat: 28.7041, lng: 77.1025 }}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={{ lat: coord.lat, lng: coord.lng }}
            onClick={() => setSelectedMarker(coord)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>Role: {selectedMarker.role}</p>
              <p>Latitude: {selectedMarker.lat}</p>
              <p>Longitude: {selectedMarker.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

const Page = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; role: string }[]>([]);

  const fetchLocationData = async () => {
    try {
      // Fetch Location Data
      console.log("Fetching location data...");
      const locationResponse = await fetch("http://localhost:3000/api/v1/ip", {
        method: "GET",
        credentials: "include",
      });
      if (!locationResponse.ok) throw new Error(`Location API Error: ${locationResponse.status}`);
      const locationData = await locationResponse.json();
      console.log("Location Data:", locationData);
  
      // Fetch All Users with Locations
      console.log("Fetching role data...");
      const roleResponse = await fetch("http://localhost:3000/api/v1/fromDB/view", {
        method: "GET",
        credentials: "include",
      });
      if (!roleResponse.ok) throw new Error(`Role API Error: ${roleResponse.status}`);
      const roleData = await roleResponse.json();
      console.log("Role Data:", roleData);
  
      // Process Role Data
      const usersWithLocations = roleData.all_users_with_locations.map((user: User) => ({
        lat: parseFloat(user.location?.latitude || "0"),
        lng: parseFloat(user.location?.longitude || "0"),
        role: user.role || "Unknown",
      })).filter((user: { lat: number; lng: number; }) => user.lat !== 0 && user.lng !== 0);
      
  
      setCoordinates(usersWithLocations);
      console.log("Processed Coordinates:", usersWithLocations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">All Buyers and Sellers are on the map</h1>
      <DynamicMap coordinates={coordinates} />
    </div>
  );
};

export default Page;
