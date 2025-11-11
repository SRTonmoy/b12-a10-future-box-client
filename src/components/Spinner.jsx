import React from 'react';
import loadingGif from '../assets/loading.gif'; // path to your GIF

export default function Spinner({ size = 50 }) {
  return (
    <div className="flex justify-center items-center">
      <img 
        src={loadingGif} 
        alt="Loading..." 
        style={{ width: size, height: size }} 
      />
    </div>
  );
}
