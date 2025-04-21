'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import MapObj from '../../components/Map';
import { CustomMarker } from '../../components/Types';
import Form from '../../components/Form';
import MarkerOverlay from '../../components/MarkerOverlay';

const MapPage = () => {
  const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [markers, setMarkers] = useState<CustomMarker[]>([]);
  const [filter, setFilter] = useState<CustomMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<CustomMarker | null>(null);
  const { data: session, status } = useSession();

  console.log(selectedMarker);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error(`Failed to fetch markers: ${response.statusText}`);
        }
        const data: CustomMarker[] = await response.json();
        setMarkers(data); // Set all markers
        setFilter(data); // Set filtered markers to all markers initially
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
    setSelectedMarker(null); // Reset selected marker when clicking on the map
  };

  const handleFormSubmit = (marker: CustomMarker) => {
    setMarkers((prev) => [...prev, marker]); // Add the new marker to the state
    setFilter((prev) => [...prev, marker]); // Add the new marker to the filtered markers
  };

  const onFilterChange = (filter: boolean) => {
    if (filter && session?.user?.id) {
      setFilter(markers.filter((marker) => marker.userId === session.user.id));
    } else {
      setFilter(markers); // Reset to all markers if filter is not applied
    }
  }

  return (
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="w-full md:w-1/3 p-4">
          <Form selectedLatLng={selectedLatLng} onSubmit={handleFormSubmit} onFilterChange={onFilterChange} />
        </div>
        <div className="w-full md:w-2/3 relative min-h-screen">
          <MapObj 
            onMapClick={handleMapClick} 
            markers={filter} 
            onMarkerClick={(marker) => {
              setSelectedMarker(marker as CustomMarker)
            } }
          />
          {selectedMarker && (
        <MarkerOverlay
          markerId={selectedMarker._id}
          onClose={() => setSelectedMarker(null)} // Close the overlay when clicking outside
        />
          )}
        </div>
      </div>
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
