'use client';
import React, { useState } from 'react';
import MapObj from './Map';
import Form from './Form';
import CustomMarker from '../components/Map';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MapWithForm() {
  const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
  };

const handleFormSubmit = (marker: typeof CustomMarker) => {
  console.log("Session:", session);
  if (!session || session === null) {
    router.push('/login'); 
    return;
  }
  setMarkers((prev) => [...prev, marker]);
};


  return (
    <>
      <Form onSubmit={handleFormSubmit} selectedLatLng={selectedLatLng} />
      <MapObj onMapClick={handleMapClick} markers={markers} />
    </>
  );
}
