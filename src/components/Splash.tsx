import React from 'react';
import Link from 'next/link';

const Splash = () => {
  return (
    <div
      className="splash-container h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/map.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="splash-content flex flex-col items-center w-4/5">
        {/* Left Section */}
        <div className="left-section flex flex-col items-center w-full gap-6">
          <div className="text-box bg-white shadow-md rounded-md p-6 w-full max-w-lg">
            <h1 className="text-lg font-bold text-red-600">Welcome to the UGA Amenities Application!</h1>
          </div>
          <div className="text-box bg-white shadow-md rounded-md p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-red-600">Purpose/Function</h2>
            <p className="text-sm text-gray-500">
              This application allows you to create your own custom pins on an interactive map. Any specific thing you want to pin (bathrooms, stairs, etc.), you can do it here!
            </p>
          </div>
          <div className="text-box bg-white shadow-md rounded-md p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold text-red-600">How To Use</h2>
            <p className="text-sm text-gray-500">
              Simply navigate to the Maps page to get started! You'll need to create an account and be logged in to submit a pin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;