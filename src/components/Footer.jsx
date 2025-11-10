import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-gray-100 mt-8 py-6">
      <div className="container text-center">
        <h3 className="font-bold">HabitHub</h3>
        <p>Contact: sahriarrahman701@gmail.com</p>
        <div className="mt-2 text-sm text-gray-600">© {new Date().getFullYear()} HabitHub — Terms & Conditions</div>
      </div>
    </footer>
  );
}
