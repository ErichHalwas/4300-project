'use client';
import React, { useState } from 'react';
import MapObj from './Map';
import Form from './Form';
import CustomMarker from '../components/Map';
import { useRouter } from 'next/navigation';

export default function MapWithForm() {
  const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const router = useRouter();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
  };

  const handleFormSubmit = (marker: typeof CustomMarker) => {

    setMarkers((prev) => [...prev, marker]);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} selectedLatLng={selectedLatLng} />
      <MapObj onMapClick={handleMapClick} markers={markers} />
    </>
  );
}
