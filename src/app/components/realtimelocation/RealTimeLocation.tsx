"use client";

import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 28.6139, // Default to New Delhi coordinates
  lng: 77.209,
};

const DISTANCE_THRESHOLD = 10; // Minimum distance (in meters) to trigger API call

export default function RealTimeLocation() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJHnFPcb4muOFIQZ_7CNbn24le5cI8tXU", // Store the API key in .env.local
  });

  const [location, setLocation] = useState(center);
  const [allLocations, setAllLocations] = useState([]); // State to hold all locations
  const lastSentLocation = useRef(center);


    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in meters
    const toRad = (angle: number) => (angle * Math.PI) / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const fetchPublicIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip; // Returns the user's public IP address
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  
  const sendLocationToAPI = async (lat: number, lng: number) => {
    try {
      const ip = await fetchPublicIP(); // Get the user's IP address
      const response = await fetch("http://localhost:3000/ap/v1/addloc/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ latitude: lat, longitude: lng, ip }),
      });
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Location sent successfully:", data);
    } catch (error) {
      console.error("Error sending location to API:", error);
    }
  };

  const fetchAllLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/ap/v1/addloc/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }

      const data = await response.json();
      setAllLocations(data.all);
    } catch (error) {
      console.error("Error fetching all locations:", error);
    }
  };

  useEffect(() => {
    fetchAllLocations(); // Fetch all locations on component mount

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          lastSentLocation.current = { lat: latitude, lng: longitude }; // Update last sent location
          sendLocationToAPI(latitude, longitude); // Send the initial location
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = haversineDistance(
            lastSentLocation.current.lat,
            lastSentLocation.current.lng,
            latitude,
            longitude
          );

          if (distance > DISTANCE_THRESHOLD) {
            setLocation({ lat: latitude, lng: longitude });
            lastSentLocation.current = { lat: latitude, lng: longitude }; // Update last sent location
            sendLocationToAPI(latitude, longitude); // Send updated location
          }
        },
        (error) => console.error("Error watching location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);


  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
      {/* Marker for the user's real-time location */}
      <Marker position={location} />

      {/* Markers for all locations from the API */}
      {allLocations.map((loc: any) => (
        <Marker
          key={loc._id}
          position={{
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
          }}
        />
      ))}
    </GoogleMap>
  );
}
