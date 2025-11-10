import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3">This page was abducted by aliens!</p>
        <Link to="/" className="btn btn-primary mt-4 inline-block">Beam me home</Link>
      </div>
    </div>
  );
}
