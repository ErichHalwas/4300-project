import React, { useEffect, useState } from "react";

interface Marker {
  name: string;
  lat: number;
  lng: number;
  imageLink?: string;
}

export default function MarkerOverlay({
  markerId,
  onClose,
}: {
  markerId: string;
  onClose: () => void;
}) {
  const [marker, setMarker] = useState<Marker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        console.log("Fetching marker data for ID:", markerId);
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/items/${markerId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch marker data: ${response.statusText}`);
        }

        const data: Marker = await response.json();
        console.log(data);
        setMarker(data);

      } catch (err: any) {
        setError(err.message || "An error occurred while fetching marker data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkerData();
  }, [markerId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".marker-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  if (loading) {
    return (
      <div className="marker-overlay" style={{ padding: "1rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", zIndex: 1000 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="marker-overlay" style={{ padding: "1rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", zIndex: 1000 }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!marker) {
    return null;
  }

  return (
    <div
      className="marker-overlay"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      <h2>{marker.name}</h2>
      <p>
        Coordinates: {marker.lat}, {marker.lng}
      </p>
      {marker.imageLink && (
        <img
          src={marker.imageLink}
          alt={marker.name}
          style={{ maxWidth: "200px", maxHeight: "150px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}