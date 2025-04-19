'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import MapObj from '../../components/Map';
import { CustomMarker } from '../../components/Types';
import Form from '../../components/Form';

const MapPage = () => {
  const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [markers, setMarkers] = useState<CustomMarker[]>([]);

  // Fetch markers from the database when the component loads
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/items'); // Fetch all items from the database
        if (!response.ok) {
          throw new Error(`Failed to fetch markers: ${response.statusText}`);
        }
        const data: CustomMarker[] = await response.json();
        setMarkers(data); // Update the markers state with the fetched data
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
  };

  const handleFormSubmit = (marker: CustomMarker) => {
    setMarkers((prev) => [...prev, marker]); // Add the new marker to the state
  };

  return (
    <SessionProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="w-full md:w-1/3 p-4">
          <Form selectedLatLng={selectedLatLng} onSubmit={handleFormSubmit} />
        </div>
        <div className="w-full md:w-2/3">
          <MapObj onMapClick={handleMapClick} markers={markers} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default MapPage;

/* {
      lat: 33.948006,
      lng: -83.377319,
      colour: "#FF6347",
      name: "Monday Class",
    },
    {
      lat: 33.94591270283431,
      lng: -83.3748439644792,
      colour: "#32CD32",
      name: "Tuesday Class",
    },
    {
      lat: 33.948656,
      lng: -83.375391,
      colour: "#1E90FF",
      name: "Turtle Pond",
    },
    */
