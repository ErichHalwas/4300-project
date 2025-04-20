'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps';

type CustomMarker = {
  _id: string;
  lat: number;
  lng: number;
  colour?: string;
  name?: string;
  imageLink?: string;
};

interface MapObjProps {
  markers: CustomMarker[];
  onMapClick: (lat: number, lng: number) => void;
  onMarkerClick?: (marker: CustomMarker) => void;
}

export default function MapObj({ markers, onMapClick, onMarkerClick }: MapObjProps) {
  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (!latLng) return;
    onMapClick(latLng.lat, latLng.lng);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        mapId="Test One"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 33.948006, lng: -83.377319 }}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <AdvancedMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => onMarkerClick?.(marker)}>
            <Pin
              background={marker.colour || '#4285F4'}
              borderColor="#2a56c6"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
