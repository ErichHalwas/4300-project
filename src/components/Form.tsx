'use client';
import React, { useEffect, useState } from "react";
import Marker from "./Map";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form({ selectedLatLng, onSubmit }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    lat: "",
    lng: "",
    colour: "1",
    name: "",
    imageLink: "",
  });

  useEffect(() => {
    if (selectedLatLng) {
      setFormData((prev: any) => ({
        ...prev,
        lat: selectedLatLng.lat,
        lng: selectedLatLng.lng,
      }));
    }
  }, [selectedLatLng]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(status);
    if (status === "loading") {
      return <></>; 
    }
    // Redirect unauthenticated users to the login page
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    try {
      // Send a POST request to the API
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
          colour: getColorHex(formData.colour),
          name: formData.name,
          imageLink: formData.imageLink,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit item: ${response.statusText}`);
      }

      // Reset the form
      setFormData({
        lat: "",
        lng: "",
        colour: "1",
        name: "",
        imageLink: "",
      });

      // Notify parent component about the new marker
      const newMarker = await response.json();
      onSubmit(newMarker);
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  const getColorHex = (val: string) => {
    const colorMap: any = {
      1: "#FF0000",
      2: "#00FF00",
      3: "#0000FF",
      4: "#800080",
    };
    return colorMap[val] || "#4285F4";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Submit Location</h1>
      <form onSubmit={handleSubmit}>
        <label>Latitude</label>
        <input
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label>Longitude</label>
        <input
          name="lng"
          value={formData.lng}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label>Colour</label>
        <select
          name="colour"
          value={formData.colour}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="1">Red</option>
          <option value="2">Green</option>
          <option value="3">Blue</option>
          <option value="4">Purple</option>
        </select>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <label>Image Link</label>
        <input
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}