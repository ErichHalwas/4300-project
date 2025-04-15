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
  const { data: session, status } = useSession(); 
  const router = useRouter();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLatLng({ lat, lng });
  };

  const handleFormSubmit = (marker: typeof CustomMarker) => {
    console.log("Session:", session);

    if (status === 'loading') {
      console.log('Session is still loading...');
      return;
    }

    // Redirect to login if the user is not authenticated
    if (status === 'unauthenticated' || !session) {
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
