import React from 'react';
import Link from 'next/link';

const Splash = () => {
  return (
    <div className="splash-container bg-gray-100 h-screen flex items-center justify-center">
      <div className="splash-content flex w-4/5">
        {/* Left Section */}
        <div className="left-section flex flex-col justify-between w-1/2">
          <div className="text-box bg-gray shadow-md rounded-md p-6 mb-4">
            <h2 className="text-lg font-bold">Text Box 1</h2>
            <p className="text-sm">This is the content for the first text box.</p>
          </div>
          <div className="text-box bg-gray shadow-md rounded-md p-6 mt-4">
            <h2 className="text-lg font-bold">Text Box 2</h2>
            <p className="text-sm">This is the content for the second text box.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section w-1/2 flex items-center justify-center">
          <div className="text-box bg-grey shadow-md rounded-md p-6">
            <h2 className="text-lg font-bold">Text Box 3</h2>
            <p className="text-sm">This is the content for the third text box.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;